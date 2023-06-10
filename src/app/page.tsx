import daily_cut from '@/utils/files/output/daily/cut_file.mp3';
import track_list from '@/utils/track_list.json';
import Input from "@/app/components/Input";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import Landing from "@/app/components/Landing";
import path from "path";
import fs from "fs";
import Info from "@/app/components/Info";
import {Howl} from "howler";

export default async function Home() {
    const curdir = path.resolve('.');
    const fs = require('fs');
    const snippet = fs.readFileSync(`${curdir}/src/utils/files/output/daily/cut_file.mp3`, {encoding: 'base64'});
    const snippet_win = fs.readFileSync(`${curdir}/src/utils/files/output/daily/cut_file_win.mp3`, {encoding: 'base64'});
    const session = await getServerSession(authOptions);
    console.log('from page.tsx');
    console.log(session);
    return (
        /*
        <main className="flex min-h-screen flex-col items-center justify-start p-24 border border-black">
            {session && <Image src={session.user!.image as string} alt={'pfp'} width={100} height={100} />}
            <Input json_string={JSON.stringify(track_list)}/>
            <audio controls src={daily_cut}/>
        </main>

         */
        <>
            <Landing list_info={track_list} base64={[snippet, snippet_win]} />
        </>
    )
}
