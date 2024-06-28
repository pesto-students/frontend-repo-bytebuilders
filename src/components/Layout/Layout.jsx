import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import Loading from '../../Pages/Loading/Loading';

export function Layout() {
  const navdisabledcomponent = [
    'login',
    'register',
    'forgotPassword',
  ];
  const pathcomponent = window.location.href.split('/');

  let isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <div className="layout">
      {isAuthenticated ? (
        <RequireAuth />
      ) : (
        <>
          {!navdisabledcomponent.some((item) =>
            pathcomponent[pathcomponent.length - 1].includes(item)
          ) && <Navbar />}

          <div className="content">
            {/* {loading ? <Loading /> : <Outlet />} */}
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export function LayoutWithoutNavbar() {
  //const loading = useSelector((state) => state.user.loading);
  // console.log('loading', loading);
  <div className="layout">
    <div className="content">
      <Outlet />
    </div>
  </div>;
}

export function RequireAuth() {
  const loading = useSelector((state) => state.isLoading);

  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated
  );
  const user = useSelector((state) => state.user);
  const verifyAuthenticate = () => {
    console.log('isAuthenticated', isAuthenticated);
    if (isAuthenticated === false) {
      navigate('/login');
    }
  };
  useEffect(() => {
    verifyAuthenticate();
  }, []);
  return (
    user && (
      <>
        {isAuthenticated ? (
          <div className="layout">
            <div className="navbar">
              <Navbar />
            </div>
            <div className="content">
              <SideBar />

              <Outlet />
            </div>
          </div>
        ) : (
          <Layout />
        )}
      </>
    )
  );
}
