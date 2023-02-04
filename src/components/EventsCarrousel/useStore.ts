import { useAppSelector } from '@/core';

export const useStore = () => {
  const { events = [] } = useAppSelector(state => state.museum);

  return {
    events,
  };
};
