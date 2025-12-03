import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorites, removeFromFavorites } from '../store/features/favoritesSlice';
import TrackCard from '../components/TrackCard';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.tracks);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemove = (trackId: number) => {
    dispatch(removeFromFavorites(trackId));
  };

  return (
    <div className="favorites-page">
      <h1>Избранное</h1>
      <div className="track-list">
        {favorites.map(track => (
          <div key={track.id}>
            <TrackCard track={track} />
            <button onClick={() => handleRemove(track.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
