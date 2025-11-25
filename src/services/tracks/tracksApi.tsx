import axios from 'axios';
import { BASE_URL } from '../constants';
import { CategoryType, TrackTypes } from '../../sharedTypes/shared.Types';

const access =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwOTcxMjcxLCJpYXQiOjE2OTA5NjAxMzEsImp0aSI6ImE4YzQ5NDNmOWNmNTRlZjI5NmFmNTMyOWUwODM4YWQ5IiwidXNlcl9pZCI6NzkyfQ.5n8YHTjsgAnYnc4gioyV1wPnxM2D16PS6c9kNhC-JoE';

export const getTracks = async (): Promise<TrackTypes[]> => {
  const res = await axios.get(BASE_URL + '/catalog/track/all/', {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  return res.data.data;
};

export const getTracksId = async (id: string): Promise<CategoryType> => {
  const res = await axios.get(BASE_URL + `/catalog/selection/${id}/`, {});
  return res.data.data;
};