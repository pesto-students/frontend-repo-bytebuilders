import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import Layout from './components/Layout/Layout';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ForgetPassword from './Pages/ForgetPasswordPage/ForgetPassword';
import HomePage from './Pages/HomePage/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard.tsx';
import MyTeam from './Pages/MyTeam/MyTeam.jsx';
import Departments from './Pages/Departments/Departments.jsx';
import Leaves from './Pages/Leaves/Leaves.jsx';
import MyActions from './Pages/MyActions/MyActions.jsx';
import Attendance from './Pages/Attendance/Attendance.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
