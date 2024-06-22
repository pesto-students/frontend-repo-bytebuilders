import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from 'react-router-dom';

import LoginPage from './Pages/LoginPage/LoginPage';
import { Layout, RequireAuth } from './components/Layout/Layout';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ForgetPassword from './Pages/ForgetPasswordPage/ForgetPassword';
import HomePage from './Pages/HomePage/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import MyTeam from './Pages/MyTeam/MyTeam.jsx';
import Departments from './Pages/Departments/Departments.jsx';
import Leaves from './Pages/Leaves/Leaves.jsx';
import MyActions from './Pages/MyActions/MyActions.jsx';
import Attendance from './Pages/Attendance/Attendance.jsx';
import Designation from './Pages/Designation/Designation.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import Organisation from './Pages/Organisation/Organisation.jsx';
import Employee from './components/Employee/Employee/Employee.jsx';
import AddEmployee from './components/Employee/AddEmployee/AddEmployee.jsx';
import Holiday from './Pages/Holiday/Holiday.jsx';
import { Suspense, useEffect } from 'react';
import Loading from './Pages/Loading/Loading.jsx';
import Payroll from './Pages/Payroll/Payroll.jsx';
import { getUserdataAPI } from './api/userAPI.js';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setUser } from './Redux/userSlice.js';
import PaySlips from './Pages/PaySlips/PaySlips.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/home',
          element: <HomePage />,
        },
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/*',
          element: <HomePage />,
        },
      ],
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          path: '/forgotPassword',
          element: <ForgetPassword />,
        },
      ],
    },
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },

        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/myteam',
          element: <MyTeam />,
        },
        {
          path: '/departments',
          element: <Departments />,
        },
        {
          path: '/designation',
          element: <Designation />,
        },
        {
          path: '/leaves',
          element: <Leaves />,
        },
        {
          path: '/myactions',
          element: <MyActions />,
        },
        {
          path: '/attendance',
          element: <Attendance />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/organisation',
          element: <Organisation />,
        },
        {
          path: '/employee/:id',
          element: <Employee />,
        },
        {
          path: '/addemployee',
          element: <AddEmployee />,
        },
        {
          path: '/holiday',
          element: <Holiday />,
        },
        {
          path: '/payroll',
          element: <Payroll />,
        },
        {
          path: '/payslips',
          element: <PaySlips />,
        },
        {
          path: '*',
          element: <Dashboard />,
        },
      ],
    },
  ]);
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const getUser = async () => {
    try {
      const data = await getUserdataAPI();
      console.log('data', data);
      dispatch(setUser(data));
    } catch (error) {
      if (error.message === 'Network Error') {
      } else if (
        error.response.data.message === 'Could not verify token'
      ) {
        dispatch(logoutUser());
      }
    }
  };
  useEffect(() => {
    console.log('In Appjs', user, token);
    if (!user && token) {
      getUser();
      console.log('IngetUser');
    }
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
