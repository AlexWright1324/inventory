import type { LayoutServerLoad } from "./$types"
import { isAdmin } from "$lib/server/auth";

export const load: LayoutServerLoad = async ({locals}) => {
    const session = await locals.auth()

    return {
        session,
        admin: isAdmin(session)
    }
}