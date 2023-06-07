import daily_cut from '@/utils/files/output/daily/cut_file.mp3';
import track_list from '@/utils/track_list.json';
import Input from "@/app/components/Input";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import Landing from "@/app/components/Landing";
import path from "path";
import fs from "fs";

export default async function Home() {
    /*
    const session = await getServerSession(authOptions);
    const snippet_path = path.resolve(`./src/utils/files/output/daily/cut_file.mp3`);
    const audio_buffer = fs.readFileSync(snippet_path);
    const blob = new Blob([audio_buffer], {type: 'audio/mp3'});
     */
    return (
        /*
        <main className="flex min-h-screen flex-col items-center justify-start p-24 border border-black">
            {session && <Image src={session.user!.image as string} alt={'pfp'} width={100} height={100} />}
            <Input json_string={JSON.stringify(track_list)}/>
            <audio controls src={daily_cut}/>
        </main>

         */
        <>
            <Input list_info={track_list} />
            <Landing json_string={JSON.stringify(track_list)}/>
        </>
    )
}
