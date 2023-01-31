import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Landing from './page/Landing';
import Register from './page/Register';
import LogIn from './page/LogIn';
import Error from './page/Error';

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
