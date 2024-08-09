import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { Asset, Category, Location } from "$lib/server/database";
import { isAdmin } from "$lib/server/auth";

export const load: PageServerLoad = async ({ parent }) => {
  const layout = await parent();

  if (!layout.session) {
    return redirect(307, "/");
  }

  const assets = await Asset.findAll({ raw: true, nest: true });

  return { assets }
}

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const session = await locals.auth();
    if (isAdmin(session)) {
      const asset = await Asset.create({}, { include: [Category, Location] })
      throw redirect(303, `/assets/${asset.id}`)
    }
  }
};