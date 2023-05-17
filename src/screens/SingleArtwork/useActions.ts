import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setLoadingArtwork,
  setArtwork,
  resetArtwork,
  toggleIsArtworkBuggy,
} from '@/core/museum';
import { requestGetArtwork } from '@/core/museum/actions';

export const useActions = () => {
  const dispatch = useDispatch();

  const handleGetArtwork = useCallback(
    async (id: number) => {
      dispatch(setLoadingArtwork(true));
      try {
        const result = await requestGetArtwork({ id });
        const { data: response } = result;
        dispatch(setArtwork(response.data));
      } catch (error) {
        const message =
          error instanceof Error
            ? error?.message
            : 'handleGetEvents unknown error.';
        throw new Error(message);
      } finally {
        dispatch(setLoadingArtwork(false));
      }
    },
    [dispatch],
  );

  const handleResetArtwork = useCallback(() => {
    dispatch(resetArtwork());
  }, [dispatch]);

  const toggleIsBuggy = useCallback(() => {
    dispatch(toggleIsArtworkBuggy());
  }, [dispatch]);

  return {
    handleGetArtwork,
    handleResetArtwork,
    toggleIsBuggy,
  };
};
