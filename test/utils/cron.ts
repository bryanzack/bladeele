const path = require('path');

const fs = require('fs');
const MP3Cutter = require('mp3-cutter');
const MP3Duration = require('mp3-duration');
import {ListInfo} from "@/utils/types";

function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomFile(path_to_albums: string) {
    const length_album = fs.readdirSync(path_to_albums).length - 1
    const rand_album = randomIntFromInterval(0, length_album-1);
    const album_name = fs.readdirSync(path_to_albums).at(rand_album);
    const length_track = fs.readdirSync(`${path_to_albums}/${album_name}`).length - 2 // account for cover art file
    const rand_track = randomIntFromInterval(0, length_track-2);
    const track_name = fs.readdirSync(`${path_to_albums}/${album_name}/`).at(rand_track)
    return {
        track_path: `${path_to_albums}/${album_name}/${track_name}`,
        track_name: track_name
    }
}

async function cutFile(track_object: {track_path: string, track_name: string}, difficulty: 'easy'|'medium'|'hard', output_dir: string) {
    const length = await MP3Duration(track_object.track_path).then((l:number) => Math.floor(l));
    const snippet_length =
        difficulty === 'easy'
            ? 10 :
            difficulty === 'medium'
                ? 5 :
                difficulty === 'hard'
                    ? 3 : 10;
    const in_bounds = length - snippet_length;
    const start = randomIntFromInterval(0, in_bounds);
    const end = start+snippet_length;
    console.log('')
    console.log(`diff: ${difficulty}`);
    console.log(`snippet_length: ${snippet_length}`);
    console.log(`file length (s): ${length}`);
    console.log(`in_bounds: ${in_bounds}`);
    console.log(`start: ${start}`);
    console.log(`end: ${end}`);
    console.log(`path: ${track_object.track_path}`);
    console.log('')

    MP3Cutter.cut({
        src: track_object.track_path,
        target: `${output_dir}/cut_file.mp3`,
        start: start,
        end: end
    });
    const answer = {
        answer: `${track_object.track_name.slice(4, track_object.track_name.length-4)}`,
    }
    fs.writeFileSync(`${path.resolve('.') + '/files/output/daily/answer.json'}`, JSON.stringify(answer))
    console.log(path.resolve('.'));

    return `cut_file.mp3`;
}

function generateSnippet(path_to_albums: string, output_dir: string, difficulty: 'easy'|'medium'|'hard') {
    const track_object = getRandomFile(path_to_albums);
    return cutFile(track_object, difficulty, output_dir);
}

function generateTrackObject() {
    const json_obj: ListInfo = {
        exhaustive_tracklist: [],
        albums: []
    };
    const cur = path.resolve('./files/studio_albums');
    const dir = fs.readdirSync(cur)
    for (let i = 0; i < dir.length; i++) {
        const track_array = fs.readdirSync(`${cur}/${dir[i]}`);
        console.log(dir[i].slice(13));
        json_obj.albums.push({
            album_name: dir[i].slice(13),
            track_list: [],
        });
        for (let t = 0; t < track_array.length-1; t++) {
            console.log(track_array[t]);
            json_obj.albums[i].track_list.push(track_array[t].slice(4, track_array[t].length-4));
            json_obj.exhaustive_tracklist.push(track_array[t].slice(4, track_array[t].length-4));
        }
    }
    const json = JSON.stringify(json_obj);
    fs.writeFileSync(path.resolve('.') + '/track_list.json', json, "utf-8", () => {
        console.log('Finished operation...');
    })
}


async function main() {
    const curdir = path.resolve('.');
    console.log(curdir);
    await generateSnippet(`${curdir}/files/studio_albums`, `${curdir}/files/output/daily/`, "easy");
    await generateTrackObject();
}

main();
