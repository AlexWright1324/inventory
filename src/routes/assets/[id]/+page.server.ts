import type { PageServerLoad, Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { Asset, Category, Location } from "$lib/server/database";
import { isAdmin } from "$lib/server/auth";
import { rmdir } from "fs/promises";

export const load: PageServerLoad = async ({ parent, params }) => {
  const layout = await parent();

  if (!layout.session) {
    return redirect(307, "/");
  }

  const asset = await Asset.findOne({ where: { id: params.id }, raw: true, nest: true, include: [Category, Location] });
  if (!asset) {
    error(404, { message: "Asset not found" });
  }
  return { asset }
}

export const actions: Actions = {
  delete: async ({ request, locals, params }) => {
    const session = await locals.auth();
    if (isAdmin(session)) {
      const formData = await request.formData();
      const id = formData.get("id") as string;
      if (!id) return
      const asset = await Asset.destroy({ where: { id } });
      if (asset > 0) {
        await rmdir(`store/${params.id}`, { recursive: true });
      }
      throw redirect(303, "/assets")
    }
  }
}