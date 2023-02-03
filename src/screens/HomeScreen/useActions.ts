import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  setLoadingEvents,
  setEvents,
  setLoadingArtworks,
  setArtworks,
} from '@/core/museum';
import { requestGetArtworks, requestGetEvents } from '@/core/museum/actions';

export const useActions = () => {
  const [offsetArtworks, setOffsetArtworks] = useState(0);
  const dispatch = useDispatch();

  const handleGetEvents = useCallback(async () => {
    dispatch(setLoadingEvents(true));
    try {
      const result = await requestGetEvents({ limit: 10 });
      const { data: response } = result;
      dispatch(setEvents(response.data));
    } catch (error) {
      const message =
        error instanceof Error
          ? error?.message
          : 'handleGetEvents unknown error.';
      throw new Error(message);
    } finally {
      dispatch(setLoadingEvents(false));
    }
  }, [dispatch]);

  const handleGetArtworks = useCallback(
    async (page?: number | null) => {
      dispatch(setLoadingArtworks(true));
      try {
        const result = await requestGetArtworks({
          limit: 10,
          page: page || offsetArtworks,
        });
        const { data: response } = result;
        console.log('🚀 ~ response', response.length);
        setOffsetArtworks(response.pagination.current_page + 1);
        console.log('===>', offsetArtworks);
        dispatch(setArtworks(response.data));
      } catch (error) {
        const message =
          error instanceof Error
            ? error?.message
            : 'handleGetArtworks unknown error.';
        throw new Error(message);
      } finally {
        dispatch(setLoadingEvents(false));
      }
    },
    [dispatch, offsetArtworks],
  );

  return {
    handleGetEvents,
    handleGetArtworks,
  };
};
