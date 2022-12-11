import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../configs/auth';
import Clientes from '../pages/Clientes';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Produtos from '../pages/Produtos';

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
        <Route path='/produtos' element={<Produtos />} />


        {/*ROTAS PRIVADAS */}
        <Route
          path="/clientes"
          element={
            <PrivateRoute redirectTo={'/login'}>
              <Clientes />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;