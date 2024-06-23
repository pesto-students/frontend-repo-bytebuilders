import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Redux/userSlice';
import Initials from '../Initials/Initials';

export default function Navbar() {
  const authenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className="navbarContainer">
      <div className="rightbox">
        <Link to="/">
          <img src="./logo.svg" alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="leftbox">
        <div className="menuIcon" onClick={() => setOpen(!open)}>
          <img src="./menu.png" alt="Menu" />
        </div>
        <div className={`mobileMenu ${open ? 'active' : ''}`}>
          {authenticated ? (
            <>
              {' '}
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <Link to="/myteam" onClick={() => setOpen(false)}>
                My Team
              </Link>
              <Link to="/organisation" onClick={() => setOpen(false)}>
                Organisation
              </Link>
              <Link to="/departments" onClick={() => setOpen(false)}>
                Departments
              </Link>
              <Link to="/designation" onClick={() => setOpen(false)}>
                Designation
              </Link>
              <Link to="/leaves" onClick={() => setOpen(false)}>
                Leaves
              </Link>
              <Link to="/holiday" onClick={() => setOpen(false)}>
                Holiday
              </Link>
              <Link to="/attendance" onClick={() => setOpen(false)}>
                Attendance
              </Link>
              {user.isAdmin || user.isPayrollExecutive ? (
                <Link to="/payroll" onClick={() => setOpen(false)}>
                  Payroll
                </Link>
              ) : (
                <Link to="/payslips" onClick={() => setOpen(false)}>
                  Payslip
                </Link>
              )}
              <Link to="/myactions" onClick={() => setOpen(false)}>
                My Action
              </Link>
              <Link to="/profile" onClick={() => setOpen(false)}>
                My Profile
              </Link>
            </>
          ) : (
            <>
              <>
                <Link to="/register" className="authLink">
                  Sign Up
                </Link>
                <Link to="/login" className="authLink">
                  Log in
                </Link>
              </>
            </>
          )}
          {authenticated && (
            <div className="mobileProfile" onClick={logout}>
              <div className="circle">
                <Initials name={user.fullName} />
              </div>
            </div>
          )}
        </div>
        <div className="authLinks">
          {!authenticated ? (
            <>
              <Link to="/register" className="authLink">
                Sign Up
              </Link>
              <Link to="/login" className="authLink">
                Log in
              </Link>
            </>
          ) : (
            <div className="navbarProfile" onClick={logout}>
              <div className="circle">
                <Initials name={user.fullName} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
