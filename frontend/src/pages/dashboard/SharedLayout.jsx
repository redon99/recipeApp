import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Drawer from './../../components/Drawer';

const SharedLayout = () => {
  return (
    <div>
      <Drawer children={<Outlet />} />
    </div>
  );
};

export default SharedLayout;
