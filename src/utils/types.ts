export type TList = { track_list: string[] }
type AlbumContents = {
        album_name: string,
        track_list: string[],
}

export type List = AlbumContents[];

export type ListInfo = {
    exhaustive_tracklist: string[],
    albums: List,
}
