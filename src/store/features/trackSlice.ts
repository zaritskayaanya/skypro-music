import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackTypes } from '../../sharedTypes/shared.Types';

type initialStateType = {
  currentTrack: TrackTypes | null;
  isPlay: boolean;
  playList: TrackTypes[];
  isShuffle: boolean;
  shaffledPlayList: TrackTypes[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playList: [],
  isShuffle: false,
  shaffledPlayList: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackTypes>) => {
      state.currentTrack = action.payload;
    },
    setCurrentTrackList: (state, action: PayloadAction<TrackTypes[]>) => {
      state.playList = action.payload;
      state.shaffledPlayList = [...state.playList].sort(
        () => Math.random() - 0.5,
      );
    },

    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shaffledPlayList
        : state.playList;
      const curInd = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curInd === -1 || curInd === state.playList.length - 1) return;
      const nextInd = curInd + 1;
      state.currentTrack = state.playList[nextInd];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shaffledPlayList
        : state.playList;
      const curInd = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curInd <= 0) return;
      const prevInd = curInd - 1;
      state.currentTrack = state.playList[prevInd];
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentTrackList,
  setNextTrack,
  toggleShuffle,
  setPrevTrack,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;