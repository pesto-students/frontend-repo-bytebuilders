import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';

export default function Layout() {
  const navdisabledcomponent = [
    'login',
    'register',
    'forgotPassword',
  ];
  const pathcomponent = window.location.href.split('/');
  const user = true;
  return (
    <div className="layout">
      {!navdisabledcomponent.some((item) =>
        pathcomponent[pathcomponent.length - 1].includes(item)
      ) && <Navbar />}
      <div className="content">
        {user && <SideBar />}
        <Outlet />
      </div>
    </div>
  );
}
