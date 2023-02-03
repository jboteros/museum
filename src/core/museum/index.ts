import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, Artwork } from './types';

type StateEvents = [] | Event[];
type StateArtworks = [] | Artwork[];

interface EventSlice {
  events: StateEvents;
  event: Event | null;
  loadingEvents: boolean;
  artworks: StateArtworks;
  artwork: Artwork | null;
  loadingArtworks: boolean;
}

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: {
    events: [],
    event: null,
    loadingEvents: false,
    artworks: [],
    artwork: null,
    loadingArtworks: false,
  } as EventSlice,
  reducers: {
    setLoadingEvents(state, action: PayloadAction<boolean>) {
      state.loadingEvents = action.payload;
    },
    setEvents(state, action: PayloadAction<StateEvents>) {
      state.events = action.payload;
    },
    setEvent(state, action: PayloadAction<Event>) {
      state.event = action.payload;
    },
    setLoadingArtworks(state, action: PayloadAction<boolean>) {
      state.loadingArtworks = action.payload;
    },
    setArtworks(state, action: PayloadAction<StateArtworks>) {
      state.artworks = [...state.artworks, ...action.payload];
    },
    setArtwork(state, action: PayloadAction<Artwork>) {
      state.artwork = action.payload;
    },
  },
});

export const {
  setLoadingEvents,
  setEvents,
  setEvent,
  setLoadingArtworks,
  setArtworks,
  setArtwork,
} = eventSlice.actions;

export default eventSlice.reducer;
