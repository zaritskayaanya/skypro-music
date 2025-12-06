'use client';

import Link from 'next/link';
import styles from './track.module.css';
import { formatTime } from '../../utils/helpers';
import { TrackTypes } from '../../sharedTypes/shared.Types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setCurrentTrack, setCurrentTrackList, setIsPlay } from '../../store/features/trackSlice';

interface TrackProps {
  track: TrackTypes;
  playList: TrackTypes[];
}

export default function Track({ track, playList }: TrackProps) {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.tracks.isPlay);
  const currentTrackId = useAppSelector((state) => state.tracks.currentTrack?._id);

  const isCurrentTrack = currentTrackId === track._id;
  const displayDot = isCurrentTrack && isPlaying;

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentTrackList(playList));
    dispatch(setIsPlay(true));
  };

  return (
    <div className={styles.playlist__item} onClick={onClickTrack}>
      <div className={styles.playlist__track}>
        {/* Название трека */}
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {displayDot ? (
              <span className={styles.playing_dot}></span>
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note" />
              </svg>
            )}
          </div>

          <Link href={`/track/${track._id}`} className={styles.track__titleLink}>
            {track.name}
          </Link>
        </div>

        {/* Исполнитель */}
        <div className={styles.track__author}>
          <Link href={`/artist/${track.author?._id || '#'}`} className={styles.track__authorLink}>
            {track.author?.name || 'Неизвестный исполнитель'}
          </Link>
        </div>

        {/* Альбом */}
        <div className={styles.track__album}>
          <Link href={`/album/${track.album?._id || '#'}`} className={styles.track__albumLink}>
            {track.album?.name || 'Без альбома'}
          </Link>
        </div>

        {/* Длительность + лайк (иконка времени) */}
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
