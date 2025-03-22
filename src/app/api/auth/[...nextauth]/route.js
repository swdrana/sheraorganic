import { getUserByEmail } from "@/app/backend/actions/user.action";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Fetch user from your database
          const user = await getUserByEmail(email);
          // console.log("user in auth..", user);

          if (user && user.password === password) {
            // Successful authentication
            return {
              id: user.id,
              email: user.email,
              role: user.role, // Ensure role is included
              name: user.name,
            };
          } else {
            // Authentication failed
            // console.log("user...in else", user);
            return null;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }

        // if (user && (await compare(password, user.password))) {
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = (req, res) => NextAuth(req, res, authOptions);
export { handler as GET, handler as POST };
