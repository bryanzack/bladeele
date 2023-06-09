import {ListInfo} from "@/utils/types";

const fs = require('fs');
const path = require('path');

export function generateTrackObject() {
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
