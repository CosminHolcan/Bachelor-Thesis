import './App.css';
import { LoginPage } from './Pages/Login/loginPage';
import { BrowserRouter as Router, NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute/privateRoute';
import { IPrivateRouteProps } from './Components/PrivateRoute/privateRoute.types';
import { RegisterPage } from './Pages/Register/registerPage';
import { UserPage } from './Pages/User/userPage';
import { AuthorizationService } from './Utils/services';
import { initializeIcons } from '@fluentui/react';
import { useEffect } from 'react';
import { MILLISECONDS_IN_A_DAY } from './globalConstants';

export const App = (): JSX.Element => {
  const isUserLoggedIn: boolean = localStorage.getItem("jwt") != null;

  const defaultProtectedRouteProps: Omit<IPrivateRouteProps, 'outlet'> = {
    authenticationPath: '/login',
  };


  return (
    <Router>
      <Routes>
        <Route path='/' element={isUserLoggedIn ? <UserPage /> : <LoginPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='patientDoctorManagement' element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<UserPage />} />} />
      </Routes>
    </Router>
  );
}
