import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../configs/auth';
import Clientes from '../pages/Clientes';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Pedidos from '../pages/Pedidos';
import DetalhesPedido from '../pages/Pedidos/Detalhes';
import NovoPedido from '../pages/Pedidos/Novo';
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
        <Route
          path="/pedidos"
          element={
            <PrivateRoute redirectTo={'/login'}>
              <Pedidos />
            </PrivateRoute>
          }
        />
        <Route
          path="/novo-pedido"
          element={
            <PrivateRoute redirectTo={'/login'}>
              <NovoPedido />
            </PrivateRoute>
          }
        />
        <Route
          path="/pedidos/:id"
          element={
            <PrivateRoute redirectTo={'/login'}>
              <DetalhesPedido />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;