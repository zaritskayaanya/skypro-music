import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackTypes } from '../../sharedTypes/shared.Types';

interface TrackSliceState {
  currentTrack: TrackTypes | null;
  isPlay: boolean;
  playList: TrackTypes[];
  isShuffle: boolean;
  shuffledPlayList: TrackTypes[];
}

const initialState: TrackSliceState = {
  currentTrack: null,
  isPlay: false,
  playList: [],
  isShuffle: false,
  shuffledPlayList: [],
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
      state.shuffledPlayList = [...state.playList].sort(() => Math.random() - 0.5);
    },

    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlayList
        : state.playList;

      const currentIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );

      if (currentIndex === -1 || currentIndex === playlist.length - 1) {
        return;
      }

      const nextIndex = currentIndex + 1;
      state.currentTrack = playlist[nextIndex];
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlayList
        : state.playList;

      const currentIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );

      if (currentIndex <= 0) {
        return;
      }

      const previousIndex = currentIndex - 1;
      state.currentTrack = playlist[previousIndex];
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
      if (state.isShuffle) {
        state.shuffledPlayList = [...state.playList].sort(() => Math.random() - 0.5);
      }
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