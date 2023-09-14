import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      async authorize(credentials, req) {
        const { username, password, callbackUrl } = credentials;
        let destination = "/";

        // console.log("IN AUTHORIZE");
        // currentUrl = callbackUrl;
        // console.log(username);
        // console.log(password);
        // console.log(currentUrl);

        switch (callbackUrl) {
          case "/customer/dashboard":
            destination = "/customer/login";
            break;
          case "/staff/dashboard":
            destination = "/staff/login";
        }

        const res = await fetch(`http://127.0.0.1:8000${destination}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const user = await res.json();
        console.log(user);
        if (res.ok && user) {
          return user;
        } else return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/customer/login",
  },
};

export default NextAuth(authOptions);
