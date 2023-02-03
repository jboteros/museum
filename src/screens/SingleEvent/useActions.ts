import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoadingEvent, setEvent, resetEvent } from '@/core/museum';
import { requestGetEvent } from '@/core/museum/actions';

export const useActions = () => {
  const dispatch = useDispatch();

  const handleGetEvent = useCallback(
    async (id: number) => {
      dispatch(setLoadingEvent(true));
      try {
        const result = await requestGetEvent({ id });
        const { data: response } = result;
        dispatch(setEvent(response.data));
      } catch (error) {
        const message =
          error instanceof Error
            ? error?.message
            : 'handleGetEvents unknown error.';
        throw new Error(message);
      } finally {
        dispatch(setLoadingEvent(false));
      }
    },
    [dispatch],
  );

  const handleResetEvent = useCallback(() => {
    dispatch(resetEvent());
  }, [dispatch]);

  return {
    handleGetEvent,
    handleResetEvent,
  };
};
