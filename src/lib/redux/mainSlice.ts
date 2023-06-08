import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

export type SliceData = {
    track_list: string[],
    main_hovered: boolean,
    did_win: boolean,
}

const initialState: SliceData = {
    track_list: [''],
    main_hovered: false,
    did_win: false,
}

export const mainSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setTrackList: (state, action: PayloadAction<typeof initialState.track_list>) => {
            state.track_list = action.payload;
        },
        setMainHovered: (state, action: PayloadAction<typeof initialState.main_hovered>) => {
            state.main_hovered = action.payload;
        },
        setDidWin: (state, action: PayloadAction<typeof initialState.did_win>) => {
            state.did_win = action.payload;
        }
    }
});

const { actions, reducer } = mainSlice;

export const {
    setTrackList,
    setMainHovered,
    setDidWin,
} = actions;

export default reducer;