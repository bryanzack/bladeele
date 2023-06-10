import './globals.css'
import {Inter, Montserrat} from 'next/font/google'
import Providers from "@/app/components/Providers";

const path = require('path');
// @ts-ignore
global.appRoot = path.resolve(__dirname);

const inter = Inter({subsets: ['latin']});
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: '100',
});

export const metadata = {
    title: 'bladeele',
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
