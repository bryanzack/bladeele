'use client';
import useSound from "use-sound";
import {useEffect, useState} from "react";

export default async function Player({blob}: {blob: Blob}) {
    const [url, setURL] = useState('init')
    useEffect(() => {
        setURL(window.URL.createObjectURL(blob))
    }, [blob])
    return (
        <div className={'w-[200px] h-[100px] flex flex-row flex-wrap items-center justify-around border border-black'}>
            <audio controls src={url} />
        </div>
    )
}