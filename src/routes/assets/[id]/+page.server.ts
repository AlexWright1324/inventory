import type { PageServerLoad, Actions } from "./$types"
import { error, fail, redirect } from "@sveltejs/kit"
import { isAdmin } from "$lib/server/auth"
import { rmdir } from "fs/promises"
import prisma from "$lib/server/prisma"

export const load: PageServerLoad = async ({ parent, params }) => {
	const layout = await parent()

	if (!layout.session) {
		return redirect(307, "/")
	}

	const asset = await prisma.asset.findUnique({ where: { id: Number(params.id) }, include: { categories: true, location: true } })
	if (!asset) {
		error(404, { message: "Asset not found" })
	}

	return { asset }
}

export const actions: Actions = {
	delete: async ({ request, locals, params }) => {
		const session = await locals.auth()
		if (!isAdmin(session)) return fail(400, { error: "Unauthorized" })

		const data = await request.formData()
		const id = Number(data.get("id"))
		if (!id) return fail(400, { id, missing: true })
		if (isNaN(id)) return fail(400, { incorrect: true })

		await prisma.asset.delete({ where: { id } })
		await rmdir(`store/${params.id}`, { recursive: true })

		throw redirect(303, "/assets")
	}
}
