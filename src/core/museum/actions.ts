import { instanceAxios } from '@/util/axios';
import { RequestType } from './request.type';

interface eventsParameters {
  limit?: number;
}

interface eventParameter {
  id: number;
}

interface ArtworkParameters {
  id: number;
}

interface PaginationParameters {
  limit?: number;
  page?: number;
}

export const requestGetEvents = ({ limit = 5 }: eventsParameters) =>
  instanceAxios.post(RequestType.GET_EVENTS, {
    limit,
  });

export const requestGetEvent = ({ id }: eventParameter) =>
  instanceAxios.post(`${RequestType.GET_EVENTS}/${id}`);

export const requestGetArtworks = ({
  limit = 10,
  page = 0,
}: PaginationParameters) =>
  instanceAxios.post(RequestType.GET_ARTWORKS, {
    limit,
    page,
  });

export const requestGetArtwork = ({ id }: ArtworkParameters) =>
  instanceAxios.post(`${RequestType.GET_ARTWORKS}/${id}`);
