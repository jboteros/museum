import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventProps, ArtworkProps } from './types';

type StateEvents = [] | EventProps[];
type StateArtworks = [] | ArtworkProps[];

interface EventSlice {
  events: StateEvents;
  loadingEvents: boolean;
  event: EventProps | null;
  loadingEvent: boolean;
  artworks: StateArtworks;
  artwork: ArtworkProps | null;
  loadingArtworks: boolean;
  loadingArtwork: boolean;
}

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: {
    events: [],
    loadingEvents: false,
    event: null,
    loadingEvent: false,
    artworks: [],
    artwork: null,
    loadingArtworks: false,
    loadingArtwork: false,
  } as EventSlice,
  reducers: {
    setLoadingEvents(state, action: PayloadAction<boolean>) {
      state.loadingEvents = action.payload;
    },
    setEvents(state, action: PayloadAction<StateEvents>) {
      state.events = action.payload;
    },
    resetEvent(state) {
      state.event = null;
    },
    setLoadingEvent(state, action: PayloadAction<boolean>) {
      state.loadingEvent = action.payload;
    },
    setEvent(state, action: PayloadAction<EventProps>) {
      state.event = action.payload;
    },
    setLoadingArtworks(state, action: PayloadAction<boolean>) {
      state.loadingArtworks = action.payload;
    },
    setArtworks(state, action: PayloadAction<StateArtworks>) {
      state.artworks = [...state.artworks, ...action.payload];
    },
    resetArtworks(state) {
      state.artworks = [];
    },
    setLoadingArtwork(state, action: PayloadAction<boolean>) {
      state.loadingArtwork = action.payload;
    },
    setArtwork(state, action: PayloadAction<ArtworkProps>) {
      state.artwork = action.payload;
    },
    resetArtwork(state) {
      state.artwork = null;
    },
  },
});

export const {
  setLoadingEvents,
  setEvents,
  setLoadingEvent,
  setEvent,
  resetEvent,
  setLoadingArtworks,
  setArtworks,
  setArtwork,
  setLoadingArtwork,
  resetArtworks,
  resetArtwork,
} = eventSlice.actions;

export default eventSlice.reducer;
