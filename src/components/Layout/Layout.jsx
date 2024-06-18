import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import './Layout.css';
import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import Loading from '../../Pages/Loading/Loading';

export function Layout() {
  // const loading = useSelector((state) => state.user.loading);
  // console.log('loading', loading);
  const navdisabledcomponent = [
    'login',
    'register',
    'forgotPassword',
  ];
  const pathcomponent = window.location.href.split('/');
  // const user = useSelector((state) => state.isAuthenticated);
  const user = true;
  useEffect(() => {});
  return (
    <div className="layout">
      {
        <>
          {!navdisabledcomponent.some((item) =>
            pathcomponent[pathcomponent.length - 1].includes(item)
          ) && <Navbar />}

          <div className="content">
            {/* {loading ? <Loading /> : <Outlet />} */}
            <Outlet />
          </div>
        </>
      }
    </div>
  );
}

export function LayoutWithoutNavbar() {
  //const loading = useSelector((state) => state.user.loading);
  // console.log('loading', loading);
  <div className="layout">
    <div className="content">
      {/* {loading ? <Loading /> : <Outlet />} */}
      <Outlet />
    </div>
  </div>;
}

export function RequireAuth() {
  const loading = useSelector((state) => state.isLoading);
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated
  );
  console.log('loading', loading);
  const token = localStorage.getItem('token');

  return !isAuthenticated ? (
    <Navigate to={'/home'} />
  ) : (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <SideBar />
          <Outlet />
          {/* {loading ? <Loading /> : <Outlet />} */}
        </div>
      </div>
    </>
  );
}
