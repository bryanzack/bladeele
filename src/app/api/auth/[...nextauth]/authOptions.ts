import Twitter from "next-auth/providers/twitter";
import {AuthOptions, Session} from "next-auth";
import {User} from "next-auth";
import {AST} from "eslint";

export const authOptions: AuthOptions = {
    providers: [
        Twitter({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
            version: "2.0",
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({token, account, profile}) {
            if (account) {
                // @ts-ignore
                token = profile.data;
            }
            return token;
        },
        async session({ session, token, user }) {
            // @ts-ignore
            session!.user!.id = token.id;
            // @ts-ignore
            session!.user!.username = token.username;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}