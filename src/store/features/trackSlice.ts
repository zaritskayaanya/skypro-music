import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackTypes } from '../../sharedTypes/shared.Types';

type initialStateType = {
  currentTrack: TrackTypes | null;
};

const initialState: initialStateType = {
  currentTrack: null,
};

const trackSlice = createSlice({
  name: 'tracks',  
  initialState,  
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackTypes>) => {
    state.currentTrack = action.payload;    
    },  
  },
});

export const { setCurrentTrack } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;