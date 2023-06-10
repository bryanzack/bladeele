import { withAuth } from "next-auth/middleware"
import whitelist from "../whitelist";
import {NextResponse} from "next/server";


export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        //console.log(req.nextauth.token)
        // @ts-ignore
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token;
            },
        },
    }
)
