import './App.css';
import { LoginPage } from './Pages/Login/loginPage';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute/privateRoute';
import { isUserLoggedIn } from './Services/authentificationService';
import { IPrivateRouteProps } from './Components/PrivateRoute/privateRoute.types';

const defaultProtectedRouteProps: Omit<IPrivateRouteProps, 'outlet'> = {
  isAuthenticated: !!localStorage.getItem('token'),
  authenticationPath: '/login',
};

export const App = (): JSX.Element => {
  return (
    <Router>
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} >
      <Route path='pacientDoctorManagement' element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<UserPage />} />} />
    </Router>
  );
}
