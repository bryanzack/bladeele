import fs from 'fs';
import path from 'path';
import {generateSnippet} from "@/utils/generateSnippet";
const sha256 = require('sha256');
const { createHash } = require('crypto');

export async function GET(request: Request, response: Response) {
    const output_dir = path.resolve('./src/utils/files/output/rapid');
    const albums_dir = path.resolve('./src/utils/files/studio_albums');
    const file_name = await generateSnippet(albums_dir, output_dir, 'easy');
    const snippet_path = path.resolve(`./src/utils/files/output/rapid/${file_name}`);
    const audio_buffer = fs.readFileSync(snippet_path);
    await fs.unlink(snippet_path, () => {
        console.log(`file at ${snippet_path} has been deleted`)
    });

    //console.log(file_name)
    //console.log(sha256(file_name));
    const file_sha = sha256(file_name);
    console.log(file_sha);

    return new Response(audio_buffer, {
        status: 200,
        statusText: file_sha,
        headers: { 'Content-Type': 'audio/mp3'}
    });
}