'use client';
import { useAtom } from 'jotai';
import {acceptedAtom} from "@/jotai/atoms";
export default function EnterDialogue() {
    const [accepted, setAccepted] = useAtom(acceptedAtom);
    return (
        <div className={'w-screen h-screen flex items-center justify-center text-2xl bg-black text-white font-montserrat'}>
            <button className={'w-[200px] h-[40px] border border-white'} onClick={() => setAccepted(true)}>Enter</button>
        </div>
    );
}