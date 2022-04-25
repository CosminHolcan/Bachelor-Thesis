import './App.css';
import { LoginPage } from './Pages/Login/loginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute/privateRoute';
import { isUserLoggedIn } from './Services/authentificationService';
import { IPrivateRouteProps } from './Components/PrivateRoute/privateRoute.types';
import { RegisterPage } from './Pages/Register/registerPage';

const defaultProtectedRouteProps: Omit<IPrivateRouteProps, 'outlet'> = {
  isAuthenticated: !!localStorage.getItem('token'),
  authenticationPath: '/login',
};

export const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        {/* <Route path='pacientDoctorManagement' element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<UserPage />} />} /> */}
      </Routes>
    </Router>
  );
}
