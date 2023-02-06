import { useAppSelector } from '@/core';

export const useStore = () => {
  const { event, loadingEvent } = useAppSelector(state => state.museum);

  return {
    event,
    loadingEvent,
  };
};
