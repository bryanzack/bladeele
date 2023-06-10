import './globals.css'
import {Inter, Montserrat} from 'next/font/google'
import Providers from "@/app/components/Providers";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import Login from "@/app/components/Login";
import whitelist from "../../whitelist";

const path = require('path');
// @ts-ignore
global.appRoot = path.resolve(__dirname);

const inter = Inter({subsets: ['latin']});
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: '100',
});

export const metadata = {
    title: 'login',
    description: 'by b_zy',
}

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body className={`${inter.className} ${montserrat.className}`}>
            <Providers>
                {children}
            </Providers>
        </body>
        </html>
    )
}
