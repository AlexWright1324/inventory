import type { PageServerLoad, Actions } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import prisma from "$lib/server/prisma"
import { Prisma } from "@prisma/client"
import { isAdmin } from "$lib/server/auth"

export const load: PageServerLoad = async ({ parent }) => {
	const layout = await parent()

	if (!layout.admin) {
		return redirect(307, "/")
	}

	const categories = await prisma.category.findMany()
	const locations = await prisma.location.findMany()

	return { categories, locations }
}

// TODO: Could be deduplicated
export const actions: Actions = {
	addCategory: async ({ request, locals }) => {
		const session = await locals.auth()
		if (!isAdmin(session)) return fail(400, { error: "Unauthorized" })

		const data = await request.formData()
		const name = data.get("name")
		if (!name) return fail(400, { missing: true, type: "Category" })
		if (typeof name != "string") return fail(400, { incorrect: true, type: "Category" })

		try {
			await prisma.category.create({ data: { name } })
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					return fail(400, { name, exists: true, type: "Category" })
				}
			}
		}

		throw redirect(303, "/settings")
	},
	deleteCategory: async ({ request, locals }) => {
		const session = await locals.auth()
		if (!isAdmin(session)) return fail(400, { error: "Unauthorized" })

		const data = await request.formData()
		const name = data.get("name")
		if (!name) return fail(400, { missing: true, type: "Category" })
		if (typeof name != "string") return fail(400, { incorrect: true, type: "Category" })

		await prisma.category.delete({ where: { name } })

		throw redirect(303, "/settings")
	},
	addLocation: async ({ request, locals }) => {
		const session = await locals.auth()
		if (!isAdmin(session)) return fail(400, { error: "Unauthorized" })

		const data = await request.formData()
		const name = data.get("name")
		if (!name) return fail(400, { missing: true, type: "Location" })
		if (typeof name != "string") return fail(400, { incorrect: true, type: "Location" })

		try {
			await prisma.location.create({ data: { name } })
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					return fail(400, { name, exists: true, type: "Location" })
				}
			}
		}

		throw redirect(303, "/settings")
	},
	deleteLocation: async ({ request, locals }) => {
		const session = await locals.auth()
		if (!isAdmin(session)) return fail(400, { error: "Unauthorized" })

		const data = await request.formData()
		const name = data.get("name")
		if (!name) return fail(400, { data: { missing: true }, type: "Location" })
		if (typeof name != "string") return fail(400, { data: { incorrect: true }, type: "Location" })

		await prisma.location.delete({ where: { name } })

		throw redirect(303, "/settings")
	}
}
