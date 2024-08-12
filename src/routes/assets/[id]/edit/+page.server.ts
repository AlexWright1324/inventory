import type { PageServerLoad, Actions } from "./$types"
import { error, fail, redirect } from "@sveltejs/kit"
import { isAdmin } from "$lib/server/auth"
import { writeFile, mkdir, access, rm, readdir } from "fs/promises"
import type { PathLike } from "fs"
import prisma from "$lib/server/prisma"

// TODO: Use Filepond?
const createDirIfNotExists = async (dir: PathLike) =>
	access(dir)
		.then(() => undefined)
		.catch(() => mkdir(dir))

export const load: PageServerLoad = async ({ parent, params }) => {
	const layout = await parent()

	if (!layout.admin) {
		return redirect(307, `/assets/${params.id}`)
	}

	const asset = await prisma.asset.findUnique({ where: { id: Number(params.id) }, include: { categories: true, location: true } })
	if (!asset) {
		return error(404, { message: "Asset not found" })
	}

	await createDirIfNotExists(`store/${params.id}`)
	const dir = await readdir(`store/${params.id}`, { withFileTypes: true })
	const files = dir.filter((dirent) => dirent.isFile()).map((dirent) => dirent.name)
	const locations = await prisma.location.findMany()

	return {
		asset,
		files,
		locations
	}
}

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		const session = await locals.auth()
		if (!isAdmin(session)) return fail(400, { error: "Unauthorized" })

		const data = await request.formData()
		const name = data.get("name")
		const tag = data.get("tag")
		const quantity = Number(data.get("quantity"))
		const description = data.get("description")
		const locationName = data.get("locationName")

		if (typeof name != "string" || typeof tag != "string" || typeof description != "string" || isNaN(quantity) || typeof locationName != "string") return fail(400, { name, tag, description, locationName, missing: true })

		await prisma.asset.update({
			where: { id: Number(params.id) },
			data: {
				name,
				tag,
				quantity,
				description,
				locationName
			}
		})

		throw redirect(303, `/assets/${params.id}`)
	},
	upload: async ({ request, locals, params }) => {
		const session = await locals.auth()
		if (!isAdmin(session)) return fail(400, { error: "Unauthorized" })

		const form = Object.fromEntries(await request.formData())
		const { file } = form as { file: File }

		await createDirIfNotExists(`store/${params.id}`)
		const fileLoc = `store/${params.id}/${file.name}`
		await writeFile(fileLoc, Buffer.from(await file.arrayBuffer()))

		return {
			url: `/${fileLoc}`
		}
	},
	mkimage: async ({ request, locals, params }) => {
		const session = await locals.auth()
		if (!isAdmin(session)) return fail(400, { error: "Unauthorized" })

		const formData = await request.formData()
		const file = formData.get("file") as string
		if (!file) return
		await prisma.asset.update({ where: { id: Number(params.id) }, data: { image: file } })
	},
	delete: async ({ request, locals, params }) => {
		const session = await locals.auth()
		if (!isAdmin(session)) return fail(400, { error: "Unauthorized" })

		const formData = await request.formData()
		const file = formData.get("file") as string
		if (!file) return
		await rm(`store/${params.id}/${file}`)
	}
}
