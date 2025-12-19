'use client';

import Link from 'next/link';
import styles from './track.module.css';
import { formatTime } from '../../utils/helpers';
import { TrackTypes } from '../../sharedTypes/shared.Types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setCurrentTrack, setCurrentTrackList, setIsPlay } from '../../store/features/trackSlice';
import { MouseEvent, KeyboardEvent } from 'react';

interface TrackProps {
  track: TrackTypes;
  playList: TrackTypes[];
}

export default function Track({ track, playList }: TrackProps) {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.tracks.isPlay);
  const currentTrackId = useAppSelector((state) => state.tracks.currentTrack?._id);

  // Безопасное сравнение идентификаторов
  const isCurrentTrack = currentTrackId !== undefined && track._id !== undefined 
    ? currentTrackId === track._id 
    : false;
  const displayDot = isCurrentTrack && isPlaying;

  const handleTrackClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentTrackList(playList));
    dispatch(setIsPlay(true));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Активация по Enter или пробелу
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dispatch(setCurrentTrack(track));
      dispatch(setCurrentTrackList(playList));
      dispatch(setIsPlay(true));
    }
  };

  // Безопасное получение значений с fallback
  const authorId = track.author?._id ?? 'unknown';
  const authorName = track.author?.name ?? 'Неизвестный исполнитель';
  const albumId = track.album?._id ?? 'no-album';
  const albumName = track.album?.name ?? 'Без альбома';
  const trackDuration = track.duration_in_seconds ?? 0;

  return (
    <div 
      className={styles.playlist__item} 
      onClick={handleTrackClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Воспроизвести трек ${track.name} исполнителя ${authorName}`}
      aria-pressed={isCurrentTrack}
      data-track-id={track._id}
      data-testid="track-item"
    >
      <div className={styles.playlist__track}>
        {/* Название трека */}
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {displayDot ? (
              <div className={styles.playingIndicator} aria-hidden="true">
                <span className={styles.playing_dot}></span>
              </div>
            ) : (
              <svg 
                className={styles.track__titleSvg} 
                aria-hidden="true"
                width="16" 
                height="16"
              >
                <use xlinkHref="/img/icon/sprite.svg#icon-note" />
              </svg>
            )}
          </div>

          <Link 
            href={`/track/${track._id}`} 
            className={styles.track__titleLink}
            onClick={(e) => e.stopPropagation()} // Предотвращаем всплытие
            aria-label={`Перейти к странице трека ${track.name}`}
          >
            {track.name}
          </Link>
        </div>

        {/* Исполнитель */}
        <div className={styles.track__author}>
          <Link 
            href={`/artist/${authorId}`} 
            className={styles.track__authorLink}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Перейти к странице исполнителя ${authorName}`}
          >
            {authorName}
          </Link>
        </div>

        {/* Альбом */}
        <div className={styles.track__album}>
          <Link 
            href={`/album/${albumId}`} 
            className={styles.track__albumLink}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Перейти к странице альбома ${albumName}`}
          >
            {albumName}
          </Link>
        </div>

        {/* Длительность + лайк */}
        <div className={styles.track__time}>
          <button 
            className={styles.likeButton}
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Добавить логику лайка
            }}
            aria-label="Добавить в избранное"
            type="button"
          >
            <svg 
              className={styles.track__timeSvg}
              width="16" 
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="/img/icon/sprite.svg#icon-like" />
            </svg>
          </button>
          <span 
            className={styles.track__timeText}
            aria-label={`Длительность трека: ${formatTime(trackDuration)}`}
          >
            {formatTime(trackDuration)}
          </span>
        </div>
      </div>
    </div>
  );
}