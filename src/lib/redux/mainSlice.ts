import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

export type SliceData = {
    track_list: string[],
    main_hovered: boolean,
}

const initialState: SliceData = {
    track_list: [''],
    main_hovered: false,
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
    }
});

const { actions, reducer } = mainSlice;

export const {
    setTrackList,
    setMainHovered,
} = actions;

export default reducer;