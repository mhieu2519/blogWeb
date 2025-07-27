import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user, profile, account }) {
            if (user?.email) token.email = user.email;
            if (profile?.email) token.email = profile.email;

            if (account?.providerAccountId) {
                token.googleId = account.providerAccountId;
            }

            if (token.email && !token.role) {
                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/user-role?email=${token.email}`
                    );
                    const data = await res.json();
                    if (data.role) {
                        token.role = data.role;
                        token.id = data.id; // _id từ MongoDB
                    }
                } catch (err) {
                    console.error("Không lấy được role từ backend Express:", err);
                }
            }

            return token;
        },

        async session({ session, token }) {
            session.user.id = token.googleId || token.id || token.sub;
            session.user.role = token.role || "user";
            session.user.email = token.email || session.user.email;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
