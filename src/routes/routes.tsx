import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../configs/auth';
import Home from '../pages/Home';
import Login from '../pages/Login';

interface PrivateRouteProps {
  redirectTo: string;
  children: any;
}

const PrivateRoute = ({ children, redirectTo }: PrivateRouteProps) => {
  return isAuthenticated() ? children : <Navigate to={redirectTo} />;
};

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />


        {/*ROTAS PRIVADAS */}

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;