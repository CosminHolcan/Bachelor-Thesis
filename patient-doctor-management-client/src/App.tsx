import './App.css';
import { LoginPage } from './Pages/Login/loginPage';
import { BrowserRouter as Router, NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute/privateRoute';
import { IPrivateRouteProps } from './Components/PrivateRoute/privateRoute.types';
import { RegisterPage } from './Pages/Register/registerPage';
import { UserPage } from './Pages/User/userPage';
import { AuthorizationService } from './Utils/services';
import { initializeIcons, Label, Stack, StackItem } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { MILLISECONDS_IN_HALF_HOUR, WAITING_MILLISECONDS } from './globalConstants';
import { TailSpin } from 'react-loader-spinner';
import { delay } from './Utils/functions';
import { LoadingSpinner } from './Components/LoadingSpinner/loadingSpinner';

export const App = (): JSX.Element => {
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const isUserJWTTokenOnStorage = (): boolean => {
    return localStorage.getItem("jwt") != null;
  }

  const [showLoadingSpinner, setShowLoadingSpinner] = useState<boolean>(isUserJWTTokenOnStorage());

  const defaultProtectedRouteProps: Omit<IPrivateRouteProps, 'outlet'> = {
    authenticationPath: '/login',
  };

  initializeIcons();

  var token = localStorage.getItem("jwt");
  if (token != null) {
    AuthorizationService.RefreshToken({ jwt: token })
      .then(async (response) => {
        setCurrentUserId(response.data.userId);
        localStorage.setItem("jwt", response.data.jwt);
        await delay(WAITING_MILLISECONDS);
        setShowLoadingSpinner(false);
      })
      .catch(async (error) => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("userType");
        await delay(WAITING_MILLISECONDS);
        setShowLoadingSpinner(false);
      })
  }

  return (
    <>
      {showLoadingSpinner
        ?
        <LoadingSpinner
          height={300}
          width={300}
          labelStyle={{ fontSize: 40 }}
          wrapStackStyle={{ height: "100vh" }}
        />
        :
        <Router>
          <Routes>
            <Route path='/' element={isUserJWTTokenOnStorage() ? <UserPage currentUserId={currentUserId}/> : <LoginPage  setCurrentUserId={setCurrentUserId}/>} />
            <Route path='login' element={<LoginPage setCurrentUserId={setCurrentUserId}/>} />
            <Route path='register' element={<RegisterPage setCurrentUserId={setCurrentUserId}/>} />
            <Route path='patientDoctorManagement' element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<UserPage currentUserId={currentUserId}/>} />} />
          </Routes>
        </Router>
      }
    </>
  );
}
