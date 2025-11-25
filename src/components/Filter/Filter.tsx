'use client';

import { useState } from 'react';
import styles from './filter.module.css';
import FilterItem from '../FilterItem/FilterItem';
import {
  getUniqueReleaseYears,
  getUniqueValueByKey,
} from '../../utils/helpers';
import { TrackTypes } from '../../sharedTypes/shared.Types';
import classNames from 'classnames';

interface FilterProps {
  tracks: TrackTypes[];
}

export default function Filter({ tracks }: FilterProps) {
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);

  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string[] | null>(null);

  const closeAllModals = () => {
    setIsAuthorModalOpen(false);
    setIsYearModalOpen(false);
    setIsGenreModalOpen(false);
  };

  const authors = getUniqueValueByKey(tracks, 'author');

  const releaseYears = getUniqueReleaseYears(tracks);

  const genres = getUniqueValueByKey(tracks, 'genre');

  const handleSelectAuthor = (author: string) => {
    setSelectedAuthor(author);
    setIsAuthorModalOpen(false);
  };

  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    setIsYearModalOpen(false);
  };

  const handleSelectGenre = (genre: string[]) => {
    setSelectedGenre(genre);
    setIsGenreModalOpen(false);
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <div
        className={classNames(styles.filter__button, {
          [styles.active]: isAuthorModalOpen,
        })}
        onClick={() => {
          if (!isAuthorModalOpen) {
            closeAllModals();
            setIsAuthorModalOpen(true);
          } else {
            setIsAuthorModalOpen(false);
          }
        }}
      >
        исполнителю
        {isAuthorModalOpen && (
          <FilterItem items={[...authors]} onSelectItem={handleSelectAuthor} />
        )}
      </div>

      <div
        className={classNames(styles.filter__button, {
          [styles.active]: isYearModalOpen,
        })}
        onClick={() => {
          if (!isYearModalOpen) {
            closeAllModals();
            setIsYearModalOpen(true);
          } else {
            setIsYearModalOpen(false);
          }
        }}
      >
        году выпуска
        {isYearModalOpen && (
          <FilterItem
            items={[
              'По умолчанию',
              'Сначала новые',
              'Сначала старые',
              ...releaseYears.map(String),
            ]}
            onSelectItem={() => handleSelectYear}
          />
        )}
      </div>

      <div
        className={classNames(styles.filter__button, {
          [styles.active]: isGenreModalOpen,
        })}
        onClick={() => {
          if (!isGenreModalOpen) {
            closeAllModals();
            setIsGenreModalOpen(true);
          } else {
            setIsGenreModalOpen(false);
          }
        }}
      >
        жанру
        {isGenreModalOpen && (
          <FilterItem
            items={[...genres]}
            onSelectItem={() => handleSelectGenre}
          />
        )}
      </div>
    </div>
  );
}