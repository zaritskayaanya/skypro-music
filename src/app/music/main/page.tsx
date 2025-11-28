'use client';

import './page.css';
import CenterBlock from '../../../components/CenterBlock/CenterBlock';
import { useEffect, useState } from 'react';
import { getTracks } from '../../../services/tracks/tracksApi';
import { TrackTypes } from '../../../sharedTypes/shared.Types';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackTypes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTracks()
      .then((res) => {
        setTracks(res);
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
  }, [error]);
  return (
    <>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <CenterBlock title={"Треки"} tracks={tracks} />
      )}
    </>
  );
}