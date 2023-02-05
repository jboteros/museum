import { useAppSelector } from '@/core';

export const useStore = () => {
  const {
    artworks = [],
    loadingArtworks,
    loadingEvent,
  } = useAppSelector(state => state.museum);

  return {
    artworks,
    loadingArtworks,
    loadingEvent,
  };
};
