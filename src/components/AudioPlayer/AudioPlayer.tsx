import classNames from 'classnames';
import React from 'react';
import styles from './audioPlayer.module.css';

type audioPlayerProp = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AudioPlayer({ value, onChange }: audioPlayerProp) {
  return (
    <div className={classNames(styles.volume__progress, styles.btn)}>
      <input
        className={classNames(styles.volume__progressLine, styles.btn)}
        type="range"
        name="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}