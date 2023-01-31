import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  AddRecipe,
  AllRecipes,
  Profile,
  SharedLayout,
  Stats,
} from './page/dashboard';

import { Landing, Register, LogIn, Error } from './page';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Dashboard</div>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
