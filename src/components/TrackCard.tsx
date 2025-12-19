import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, fetchTrackLikes } from '../store/features/trackSlice';
import { RootState } from '../store';
import { MouseEvent } from 'react';

// Интерфейс для трека (адаптируйте под вашу структуру)
interface Track {
  id: string; // или _id в зависимости от вашей структуры
  _id?: string; // альтернативный вариант
  cover: string;
  title: string;
  artist: string;
  isLiked?: boolean;
  likesCount?: number;
}

interface TrackCardProps {
  track: Track;
}

const TrackCard = ({ track }: TrackCardProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // Безопасное получение ID трека
  const trackId = track.id || track._id || '';
  
  // Проверка, лайкнут ли трек
  const isLiked = track.isLiked || false;
  
  // Количество лайков с fallback
  const likesCount = track.likesCount || 0;

  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Вместо alert лучше использовать toast-уведомления
      console.warn('Пользователь не авторизован');
      // Можно показать модальное окно или перенаправить на логин
      // window.location.href = '/login';
      return;
    }
    
    if (!trackId) {
      console.error('Отсутствует ID трека');
      return;
    }
    
    dispatch(toggleLike(trackId));
    // Опционально: обновляем количество лайков после действия
    // dispatch(fetchTrackLikes(trackId));
  };

  return (
    <div 
      className="track-card"
      role="article"
      aria-label={`Трек ${track.title} исполнителя ${track.artist}`}
    >
      {/* Обложка трека */}
      <div className="track-card__image-container">
        <img 
          src={track.cover} 
          alt={`Обложка трека ${track.title}`}
          className="track-card__image"
          loading="lazy"
          width="200"
          height="200"
        />
      </div>

      {/* Информация о треке */}
      <div className="track-card__info">
        <h3 className="track-card__title">
          {track.title}
        </h3>
        <p className="track-card__artist">
          {track.artist}
        </p>
      </div>

      {/* Блок лайков */}
      <div className="track-card__actions">
        <button
          className={`like-btn ${isLiked ? 'like-btn--liked' : ''}`}
          onClick={handleLike}
          aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
          aria-pressed={isLiked}
          type="button"
          disabled={!user}
          title={!user ? 'Авторизуйтесь для голосования' : ''}
        >
          <span className="like-btn__icon" aria-hidden="true">
            {isLiked ? '❤️' : '♡'}
          </span>
          <span className="like-btn__text">
            {isLiked ? 'Лайкнуто' : 'Лайк'}
          </span>
        </button>

        <div 
          className="likes-count"
          aria-label={`Количество лайков: ${likesCount}`}
        >
          <span className="likes-count__number">{likesCount}</span>
          <span className="likes-count__label">лайков</span>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;