import type { PageServerLoad, Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { Asset, Category, Location } from "$lib/server/database";
import { isAdmin } from "$lib/server/auth";
import { writeFile, mkdir, access, rm, readdir } from "fs/promises";
import type { PathLike } from "fs";

const createDirIfNotExists = async (dir: PathLike) =>
  access(dir)
    .then(() => undefined)
    .catch(() => mkdir(dir));

export const load: PageServerLoad = async ({ parent, params }) => {
  const layout = await parent();

  if (!layout.admin) {
    return redirect(307, `/assets/${params.id}`);
  }

  const asset = await Asset.findOne({ where: { id: params.id }, raw: true, nest: true, include: [Category, Location] });
  if (!asset) {
    error(404, { message: "Asset not found" });
  }

  await createDirIfNotExists(`store/${params.id}`);
  const dir = await readdir(`store/${params.id}`, { withFileTypes: true });
  const files = dir.filter(dirent => dirent.isFile()).map(dirent => dirent.name);
  const locations = await Location.findAll({ raw: true, nest: true});

  return {
    asset,
    files,
    locations
  }
}

export const actions: Actions = {
  update: async ({ request, locals, params }) => {
    const session = await locals.auth();
    if (isAdmin(session)) {
      const form = await request.formData();
      const asset = await Asset.findOne({ where: { id: params.id } });
      if (!asset) return;

      form.forEach((value, key) => asset.set(key, value));
      const location = await Location.findOne({ where: { id: form.get("locationId") } });
      asset.setLocation(location);
      await asset.save();
      throw redirect(303, `/assets/${asset.id}`);
    }
  },
  upload: async ({ request, locals, params }) => {
    const session = await locals.auth();
    if (isAdmin(session)) {
      const form = Object.fromEntries(await request.formData());
      const { file } = form as { file: File };

      await createDirIfNotExists(`store/${params.id}`);
      const fileLoc = `store/${params.id}/${file.name}`;
      await writeFile(fileLoc, Buffer.from(await file.arrayBuffer()));

      return {
        url: `/${fileLoc}`
      }
    }
  },
  mkimage: async ({ request, locals, params }) => {
    const session = await locals.auth();
    if (isAdmin(session)) {
      const formData = await request.formData();
      const file = formData.get("file") as string;
      if (!file) return
      const asset = await Asset.findOne({ where: { id: params.id } });
      if (!asset) return;
      asset.image = file;
      await asset.save();
    }
  },
  delete: async ({ request, locals, params }) => {
    const session = await locals.auth();
    if (isAdmin(session)) {
      const formData = await request.formData();
      const file = formData.get("file") as string;
      if (!file) return
      await rm(`store/${params.id}/${file}`);
    }
  }
};