import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import FavoritesPage from './components/FavoritesPage';

// ...

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />

  {/* Защищённая страница */}
  <Route
    path="/favorites"
    element={
      <PrivateRoute>
        <FavoritesPage />
      </PrivateRoute>
    }
  />
</Routes>
