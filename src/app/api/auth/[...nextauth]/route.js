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

// Try to Anonymous Login but session not set properly and create user data now shown in console

// import { getUserByEmail } from "@/app/backend/actions/user.action";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { createId } from "@paralleldrive/cuid2";
// import { createUser } from "../../../controlers/user.controler";

// const authOptions = {
//   providers: [
//     // ✅ Email/Password Login Provider
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         try {
//           // ডাটাবেজ থেকে ইউজার খুঁজে বের করো
//           const user = await getUserByEmail(email);

//           if (user && user.password === password) {
//             // ইউজার অ্যানথেন্টিকেশন সফল হলে
//             return {
//               id: user.id,
//               email: user.email,
//               role: user.role,
//               name: user.name,
//             };
//           } else {
//             // ইউজার না পেলে
//             return null;
//           }
//         } catch (error) {
//           console.error("Error during authentication:", error);
//           return null;
//         }
//       },
//     }),

// CredentialsProvider({
//   async authorize() {
//     try {
//       return guestUser;
//   },
// }),
// ✅ Anonymous (Guest) Login Provider
//     CredentialsProvider({
//       id: "anonymous",
//       name: "Anonymous",
//       credentials: {},
//       async authorize() {
//         try {
//           // প্রতিবার গেস্টের জন্য ইউনিক আইডি তৈরি করা হচ্ছে
//           const id = createId();
//           const guestData = {
//             email: `${id}@guest.com`,
//             role: "Customer",
//             name: "Guest User",
//             status:"show",
//             password: id,
//             img:"https://res.cloudinary.com/dmadhbgty/image/upload/v1730117105/grostore/download%281%29.jpg",
//             username:id
//           };

//           console.log("Creating guest user with data:", guestData);  // Add logging to track user data

//           // // Create guest user in the database (if required)
//           const dbUser = await createUser(guestData);

//           const user = await getUserByEmail(dbUser?.email);
//           console.log('skdjfklsdjklfksdfksdklfjklsdjfklj')
//           console.log(user)
//           // user = {
//           //   ...user,
//           //   id: user._id,
//           // }
//           // console.log("Guest user created:", guestUser);

//           console.log('auth', user)
//           return {
//             id: user?._id,
//             email: `${id}@guest.com`,
//             role: "Customer",
//             name: "Guest User",
//             status:"show",
//           };

//         } catch (error) {
//           console.error("Error during anonymous login:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // কাস্টম লগইন পেজ
//   },
//   session: {
//     jwt: true, // JWT সেশন স্ট্রাটেজি
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       return session;
//     },
//   },
// };

// const handler = (req, res) => NextAuth(req, res, authOptions);
// export { handler as GET, handler as POST };
