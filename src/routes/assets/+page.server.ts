import type { PageServerLoad, Actions } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { isAdmin } from "$lib/server/auth"
import prisma from "$lib/server/prisma"

export const load: PageServerLoad = async ({ parent }) => {
	const layout = await parent()

	if (!layout.session) {
		return redirect(307, "/")
	}

	const assets = await prisma.asset.findMany({ include: { categories: true, location: true } })

	return { assets }
}

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const session = await locals.auth()
		if (!isAdmin(session)) return fail(400, { error: "Unauthorized" })
      
		const asset = await prisma.asset.create({ data: {} })
		throw redirect(303, `/assets/${asset.id}`)
	}
}
