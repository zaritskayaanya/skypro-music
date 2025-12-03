import axios from 'axios';
import { BASE_URL } from '../constants';
import { CategoryType, TrackTypes } from '../../sharedTypes/shared.Types';

axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Токен истёк. Пользователь будет перенаправлен на вход.');
    }
    return Promise.reject(error);
  },
);

/**
 * Получение всех треков
 * @returns Список треков
 */
export const getTracks = async (): Promise<TrackTypes[]> => {
  try {
    const res = await axios.get<{ data: TrackTypes[] }>('/catalog/track/all/');
    return res.data.data;
  } catch (error) {
    console.error('Ошибка при загрузке треков:', error);
    throw new Error('Не удалось загрузить список треков');
  }
};

/**
 * Получение подборки треков по ID (например, жанр, настроение и т.д.)
 * @param id - идентификатор подборки
 * @returns Объект подборки с треками
 */
export const getTracksById = async (id: string): Promise<CategoryType> => {
  try {
    const res = await axios.get<{ data: CategoryType }>(`/catalog/selection/${id}/`);
    return res.data.data;
  } catch (error) {
    console.error(`Ошибка при загрузке подборки с ID ${id}:`, error);
    throw new Error('Не удалось загрузить подборку');
  }
};

/**
 * Лайк трека
 * @param trackId - ID трека
 */
export const likeTrack = async (trackId: number): Promise<void> => {
  try {
    await axios.put(`/catalog/track/${trackId}/like/`);
  } catch (error) {
    console.error(`Ошибка при лайке трека ${trackId}:`, error);
    throw new Error('Не удалось поставить лайк');
  }
};

/**
 * Удаление трека из избранного
 * @param trackId - ID трека
 */
export const unlikeTrack = async (trackId: number): Promise<void> => {
  try {
    await axios.delete(`/catalog/track/${trackId}/like/`);
  } catch (error) {
    console.error(`Ошибка при удалении лайка с трека ${trackId}:`, error);
    throw new Error('Не удалось убрать лайк');
  }
};

/**
 * Получение избранных треков пользователя
 * @returns Список избранных треков
 */
export const getFavoriteTracks = async (): Promise<TrackTypes[]> => {
  try {
    const res = await axios.get<{ data: TrackTypes[] }>('/catalog/track/favorite/');
    return res.data.data;
  } catch (error) {
    console.error('Ошибка при загрузке избранных треков:', error);
    throw new Error('Не удалось загрузить избранное');
  }
};
