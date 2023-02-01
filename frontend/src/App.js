import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  AddRecipe,
  AllRecipes,
  Profile,
  SharedLayout,
  Stats,
} from './pages/dashboard';

import { Landing, Register, LogIn, Error, ProtectedRoute } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index path='stats' element={<Stats />} />
          <Route path='all-recipes' element={<AllRecipes />} />
          <Route path='add-recipe' element={<AddRecipe />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
