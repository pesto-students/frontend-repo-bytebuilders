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
        <Link>
          <img src="./logo.svg" alt="" />
        </Link>
      </div>
      {/* <div className="centerbox"></div> */}
      <div className="leftbox">
        <div className="menuIcon">
          <img
            src="./menu.png"
            alt="Menu"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div>
          {!authenticated ? (
            <div className="navbarloginLogout">
              <Link to="/register">Sign Up</Link>
              <Link to="/login">Log in</Link>
            </div>
          ) : (
            <>
              <div className="navbarprofile" onClick={logout}>
                <div className="cirle">
                  <Initials name={user.fullName} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
{
  /* <div className={open ? 'mobileMenu active' : 'mobileMenu'}></div> */
}
// <Link to="/myteam">
// <img src="./team.svg" alt="" /> My Team
// </Link>
// <Link to="/departments">
// <img src="./departments.svg" alt="" /> Departments
// </Link>
// <Link to="/leaves">
// <img src="./calender.svg" alt="" /> Leaves
// </Link>
// <Link to="/attendance">
// <img src="./attendance.svg" alt="" /> Attendance
// </Link>
// <Link to="#payslips">
// <img src="./payslips.svg" alt="" /> Pay Slip
// </Link>
// <Link to="/myactions">
// <img src="myactions.svg" alt="" /> My Action
// </Link>
// <Link to="#profile">
// <img src="./profile.svg" alt="" /> My Profile
// </Link>
