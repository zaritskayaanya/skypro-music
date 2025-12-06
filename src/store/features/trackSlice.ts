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

      // Перемешиваем только если шафл включён
      if (state.isShuffle && action.payload.length > 0) {
        state.shuffledPlayList = [...action.payload].sort(() => Math.random() - 0.5);
      } else {
        state.shuffledPlayList = [];
      }
    },

    setNextTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlayList : state.playList;

      // Если плейлист пуст или текущий трек не найден — выходим
      if (playlist.length === 0 || !state.currentTrack) return;

      const currentIndex = playlist.findIndex((track) => track._id === state.currentTrack?._id);

      // Если трек не найден — можно поставить первый (или оставить как есть)
      if (currentIndex === -1) {
        state.currentTrack = playlist[0];
        return;
      }

      // Зацикливание: если последний — идём на первый
      const nextIndex = (currentIndex + 1) % playlist.length;
      state.currentTrack = playlist[nextIndex];
    },

    setPrevTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlayList : state.playList;

      if (playlist.length === 0 || !state.currentTrack) return;

      const currentIndex = playlist.findIndex((track) => track._id === state.currentTrack?._id);

      if (currentIndex === -1) {
        state.currentTrack = playlist[0];
        return;
      }

      // Зацикливание назад: если первый — идём на последний
      const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
      state.currentTrack = playlist[prevIndex];
    },

    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;

      if (state.isShuffle && state.playList.length > 1) {
        // Перемешиваем только если больше одного трека
        state.shuffledPlayList = [...state.playList].sort(() => Math.random() - 0.5);
      } else {
        state.isShuffle = false;
        state.shuffledPlayList = [];
      }
    },

    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },

    resetPlayer: () => initialState,
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentTrackList,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
  resetPlayer,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;
