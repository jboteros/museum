import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  setLoadingEvents,
  setEvents,
  setLoadingArtworks,
  setArtworks,
  resetArtworks,
} from '@/core/museum';
import { requestGetArtworks, requestGetEvents } from '@/core/museum/actions';

export const useActions = () => {
  const dispatch = useDispatch();
  const [offsetArtworks, setOffsetArtworks] = useState<number>(0);

  useEffect(() => {
    dispatch(resetArtworks());
    setOffsetArtworks(1);
  }, [dispatch]);

  console.log('global ===>', offsetArtworks);

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
        if (page === 1) {
          dispatch(resetArtworks());
        }
        const result = await requestGetArtworks({
          limit: 10,
          page: page || offsetArtworks,
        });

        const { data: response } = result;

        console.log('🚀 ~ response', response);
        console.log('🚀 ~ response', response.data.length);
        console.log('🚀 ~ current_page', response.pagination.current_page);

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
        dispatch(setLoadingArtworks(false));
      }
    },
    [dispatch, offsetArtworks],
  );

  return {
    handleGetEvents,
    handleGetArtworks,
  };
};
