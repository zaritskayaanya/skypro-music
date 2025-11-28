'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CenterBlock from '../../../../components/CenterBlock/CenterBlock';
import { getTracks, getTracksId } from '../../../../services/tracks/tracksApi';
import { TrackTypes } from '../../../../sharedTypes/shared.Types';
import { AxiosError } from 'axios';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [tracks, setTracks] = useState<TrackTypes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    getTracks()
      .then(async (resData) => {
        setTracks(resData);

        const res = await getTracksId(id);
        setTitle(res.name);
        const tracksItems = res.items;
        const filterTracks = resData.filter((el) =>
          tracksItems.includes(el._id),
        );
        setTracks(filterTracks);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (err.response) {
            console.log(err.response.data);
            setError(err.response.data.message);
          } else if (err.request) {
            setError('Что-то с интернетом');
          } else {
            console.log('error:', error);
            setError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [error, id]);
  return (
    <>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <CenterBlock title={title} tracks={tracks} />
      )}
    </>
  );
}