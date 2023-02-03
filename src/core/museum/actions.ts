import { instanceAxios } from '@/util/axios';
import { RequestType } from './request.type';

// interface ResponseLoginRequest {
//   access_token: string;
//   refresh_token: string;
//   user: {
//     confirmed_at: null;
//     _id: string;
//     phone: string;
//     birth_date: string;
//     first_name: string;
//     last_name: string;
//     password: string;
//     token: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//   };
// }

interface eventsParameters {
  limit?: number;
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

export const requestGetArtworks = ({
  limit = 10,
  page = 0,
}: PaginationParameters) =>
  instanceAxios.post(RequestType.GET_ARTWORKS, {
    limit,
    page,
  });

export const requestGetArtwork = ({ id }: ArtworkParameters) =>
  instanceAxios.post(RequestType.GET_ARTWORKS, {
    id,
  });
