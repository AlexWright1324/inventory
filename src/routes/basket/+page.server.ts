import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const layout = await parent()

    if (!layout.session) {
		return redirect(307, "/")
	}

    
}