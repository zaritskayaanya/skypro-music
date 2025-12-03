import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  tracks: Track[];
}

const initialState: FavoritesState = {
  tracks: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    fetchFavorites: (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.tracks = state.tracks.filter(track => track.id !== action.payload);
    },
  },
});

export const { fetchFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
