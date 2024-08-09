import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { isAdmin } from "$lib/server/auth";
import { Category, Location } from "$lib/server/database";

export const load: PageServerLoad = async ({ parent }) => {
  const layout = await parent();

  if (!layout.admin) {
    return redirect(307, "/");
  }

  const categories = await Category.findAll({ raw: true, nest: true });
  const locations = await Location.findAll({ raw: true, nest: true });

  return { categories, locations }
}

export const actions: Actions = {
  addCategory: async ({ request, locals }) => {
    const session = await locals.auth();
    if (isAdmin(session)) {
      const formData = await request.formData();
      const name = formData.get("name") as string;
      if (!name) return
      const category = await Category.create({ name });
      throw redirect(303, "/settings")
    }
  },
  deleteCategory: async ({ request, locals }) => {
    const session = await locals.auth();
    if (isAdmin(session)) {
      const formData = await request.formData();
      const id = formData.get("id") as string;
      if (!id) return
      const category = await Category.destroy({ where: { id } });
      throw redirect(303, "/settings")
    }
  },
  addLocation: async ({ request, locals }) => {
    const session = await locals.auth();
    if (isAdmin(session)) {
      const formData = await request.formData();
      const name = formData.get("name") as string;
      if (!name) return
      const location = await Location.create({ name });
      throw redirect(303, "/settings")
    }
  },
  deleteLocation: async ({ request, locals }) => {
    const session = await locals.auth();
    if (isAdmin(session)) {
      const formData = await request.formData();
      const id = formData.get("id") as string;
      if (!id) return
      const location = await Location.destroy({ where: { id } });
      throw redirect(303, "/settings")
    }
  }
};