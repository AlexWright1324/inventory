import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { Asset } from "$lib/server/models/asset";

export const load: PageServerLoad = async ({ parent }) => {
  const layout = await parent();

  if (!layout.admin) {
    return redirect(307, "/");
  }

  const assets = await Asset.findAll();

  return { assets }
}