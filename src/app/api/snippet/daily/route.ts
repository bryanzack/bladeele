import fs from 'fs';
import path from 'path';
import {generateSnippet} from "@/utils/generateSnippet";
const sha256 = require('sha256');
const { createHash } = require('crypto');

export async function GET(request: Request, response: Response) {
    const snippet_path = path.resolve(`./src/utils/files/output/daily/cut_file.mp3`);
    const audio_buffer = fs.readFileSync(snippet_path);
    const blob = new Blob([audio_buffer], {type: 'audio/mp3'});
    const buf = await blob.arrayBuffer();

    //console.log(file_name)
    //console.log(sha256(file_name));
    //const file_sha = sha256(file_name);

    return new Response(buf, {
        status: 200,
        statusText: 'Success',
        headers: { 'Content-Type': 'audio/mp3'}
    });
}