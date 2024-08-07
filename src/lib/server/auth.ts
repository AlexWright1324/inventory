import { SvelteKitAuth } from "@auth/sveltekit"
import Keycloak from "@auth/sveltekit/providers/keycloak"
 
export const { handle, signIn } = SvelteKitAuth({
  providers: [Keycloak],

  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.profile = {
          id: profile.sub,
          groups: profile.groups,
          uniID: profile.uni_id,
        }
      }
      return token
    },
    session({session, token}) {
      if (token.profile) {
        session.user = {...session.user, ...token.profile}
      }
      return session
    }
  },
})

export const isAdmin = (session: any) => {
  return session?.user?.groups?.includes("exec") ? true : false
}