import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <div>
      <nav>
        <Link to='add-recipe'>Add Recipe</Link>
        <Link to='all-recipes'>All Recipes</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
