"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
function generateTrackObject() {
    var json_obj = {
        exhaustive_tracklist: [],
        albums: []
    };
    var cur = path.resolve('./files/studio_albums');
    var dir = fs.readdirSync(cur);
    for (var i = 0; i < dir.length; i++) {
        var track_array = fs.readdirSync("".concat(cur, "/").concat(dir[i]));
        console.log(dir[i].slice(13));
        json_obj.albums.push({
            album_name: dir[i].slice(13),
            track_list: [],
        });
        for (var t = 0; t < track_array.length - 1; t++) {
            console.log(track_array[t]);
            json_obj.albums[i].track_list.push(track_array[t].slice(4, track_array[t].length - 4));
            json_obj.exhaustive_tracklist.push(track_array[t].slice(4, track_array[t].length - 4));
        }
    }
    var json = JSON.stringify(json_obj);
    fs.writeFileSync(path.resolve('.') + '/track_list.json', json, "utf-8", function () {
        console.log('Finished operation...');
    });
}
generateTrackObject();
