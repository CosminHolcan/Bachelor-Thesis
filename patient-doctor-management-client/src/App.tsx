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
  const [isLoadingData, setLoadingData] = useState<boolean>(false);

  const defaultProtectedRouteProps: Omit<IPrivateRouteProps, 'outlet'> = {
    authenticationPath: '/login',
  };

  initializeIcons();

  const isUserLoggedIn = (): boolean => {
    return localStorage.getItem("jwt") != null;
  }

  var token = localStorage.getItem("jwt");
  !isLoadingData && token && AuthorizationService.RefreshToken({ jwt: token })
    .then(async (response) => {
      localStorage.setItem("jwt", response.data.jwt);
      await delay(WAITING_MILLISECONDS);
      setLoadingData(true);
    })
    .catch(async (error) => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("userType");
      await delay(WAITING_MILLISECONDS);
      setLoadingData(true);
    })

  return (
    <>
      {isLoadingData
        ?
        <Router>
          <Routes>
            <Route path='/' element={isUserLoggedIn() ? <UserPage /> : <LoginPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='patientDoctorManagement' element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<UserPage />} />} />
          </Routes>
        </Router>
        :
        <LoadingSpinner
          height={300}
          width={300}
          labelStyle={{ fontSize: 40 }}
          wrapStackStyle={{ height: "100vh" }}
        />
      }
    </>
  );
}
