import './App.css';
import { LoginPage } from './Pages/Login/loginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute/privateRoute';
import { IPrivateRouteProps } from './Components/PrivateRoute/privateRoute.types';
import { RegisterPage } from './Pages/Register/registerPage';
import { UserPage } from './Pages/User/userPage';
import { AuthorizationService } from './Utils/services';

export const App = (): JSX.Element => {
  const isUserLoggedIn: boolean = AuthorizationService.IsUserLoggedIn();

  const defaultProtectedRouteProps: Omit<IPrivateRouteProps, 'outlet'> = {
    isAuthenticated: isUserLoggedIn,
    authenticationPath: '/login',
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={isUserLoggedIn ? <UserPage /> : <LoginPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='pacientDoctorManagement' element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<UserPage />} />} />
      </Routes>
    </Router>
  );
}
