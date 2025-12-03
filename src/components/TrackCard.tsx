import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, fetchTrackLikes } from '../store/features/trackSlice';
import { RootState } from '../store';

const TrackCard = ({ track }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLike = () => {
    if (!user) return alert('Авторизуйтесь для голосования!');
    dispatch(toggleLike(track.id));
  };

  return (
    <div className="track-card">
      <img src={track.cover} alt={track.title} />
      <h3>{track.title}</h3>
      <p>{track.artist}</p>
      <div className="like-btn" onClick={handleLike}>
        {track.isLiked ? '❤️' : '♡'}
      </div>
      <span>Лайки: {track.likesCount}</span>
    </div>
  );
};

export default TrackCard;