"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var fs = require('fs');
var MP3Cutter = require('mp3-cutter');
var MP3Duration = require('mp3-duration');
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomFile(path_to_albums) {
    var length_album = fs.readdirSync(path_to_albums).length - 1;
    var rand_album = randomIntFromInterval(0, length_album - 1);
    var album_name = fs.readdirSync(path_to_albums).at(rand_album);
    var length_track = fs.readdirSync("".concat(path_to_albums, "/").concat(album_name)).length - 2; // account for cover art file
    var rand_track = randomIntFromInterval(0, length_track - 2);
    var track_name = fs.readdirSync("".concat(path_to_albums, "/").concat(album_name, "/")).at(rand_track);
    return {
        track_path: "".concat(path_to_albums, "/").concat(album_name, "/").concat(track_name),
        track_name: track_name
    };
}
function cutFile(track_object, difficulty, output_dir) {
    return __awaiter(this, void 0, void 0, function () {
        var length, snippet_length, in_bounds, start, end, answer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, MP3Duration(track_object.track_path).then(function (l) { return Math.floor(l); })];
                case 1:
                    length = _a.sent();
                    snippet_length = difficulty === 'easy'
                        ? 10 :
                        difficulty === 'medium'
                            ? 5 :
                            difficulty === 'hard'
                                ? 3 : 10;
                    in_bounds = length - snippet_length;
                    start = randomIntFromInterval(0, in_bounds);
                    end = start + snippet_length;
                    console.log('');
                    console.log("diff: ".concat(difficulty));
                    console.log("snippet_length: ".concat(snippet_length));
                    console.log("file length (s): ".concat(length));
                    console.log("in_bounds: ".concat(in_bounds));
                    console.log("start: ".concat(start));
                    console.log("end: ".concat(end));
                    console.log("path: ".concat(track_object.track_path));
                    console.log('');
                    MP3Cutter.cut({
                        src: track_object.track_path,
                        target: "".concat(output_dir, "/cut_file.mp3"),
                        start: start,
                        end: end
                    });
                    answer = {
                        answer: "".concat(track_object.track_name.slice(4, track_object.track_name.length - 4)),
                    };
                    fs.writeFileSync("".concat(path.resolve('.') + '/files/output/daily/answer.json'), JSON.stringify(answer));
                    console.log(path.resolve('.'));
                    return [2 /*return*/, "cut_file.mp3"];
            }
        });
    });
}
function generateSnippet(path_to_albums, output_dir, difficulty) {
    var track_object = getRandomFile(path_to_albums);
    return cutFile(track_object, difficulty, output_dir);
}
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
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var curdir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    curdir = path.resolve('.');
                    console.log(curdir);
                    return [4 /*yield*/, generateSnippet("".concat(curdir, "/files/studio_albums"), "".concat(curdir, "/files/output/daily/"), "easy")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, generateTrackObject()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
