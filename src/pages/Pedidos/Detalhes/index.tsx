import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CardItem from "../../../components/CardItem";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import api from "../../../configs/api";
import { AuthProps, getAuth, isAuthenticated } from "../../../configs/auth";
import { PedidoProps } from "../../../configs/interfaces";

export default function DetalhesPedido () {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<AuthProps>();
  const [pedido, setPedido] = useState<PedidoProps>();

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated()){
      const user = getAuth();
      setAuthUser(JSON.parse(user!));
    }else{
      toast('Você não está em uma conta!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      navigate('/');
    }
  }, []);

  useEffect(() => {
    api.get(`/orders/${id}`, {auth: authUser}).then(resp => {
      if(resp.status == 200){
        setPedido(resp.data);
      }      
    }).catch(err => {});
    setLoading(false);
  }, [authUser]);

  if(loading){
    return (<div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>)
  }
 
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="container min-h-[calc(100vh-140px)] flex flex-col m-auto justify-start items-start gap-2 my-3">
        <div className="w-11/12 m-auto bg-zinc-50 rounded-lg p-3 flex flex-col justify-start gap-2">
          <h1 className="block text-center font-bold text-3xl">Informações do Pedido</h1>
          <div className="border-4 border-sky-200 border-t-sky-800 rounded-lg py-4 px-1">
            <h5 className="block font-bold text-lg my-2"><span className="text-sky-900">ID: </span>{pedido?.order_id} </h5>
            <p className="block  text-lg my-2"><span className="text-sky-900 font-bold">Descrição: </span>{pedido?.description}</p>
            <p className="block  text-lg my-2">
              <span className="text-sky-900 font-bold">Status:</span> {pedido?.draft ? "Em aberto" : 
              pedido?.draft && !pedido?.paid ? "Aguardando pagamento" :
              pedido?.paid && !pedido.withdrawn ? "Aguardando retirada" :
              "Pedido retirado"
              }
            </p>
            <p className="block text-lg my-2"><span className="text-sky-900 font-bold">Desconto: </span>{pedido?.discount}</p>
          </div>
          <div className="border-4 border-sky-200 border-t-sky-800 rounded-lg py-4 px-1 flex flex-wrap justify-between">
            <div>
              <h5 className="block font-bold text-lg my-2"><span className="text-sky-900">Informações do Cliente</span></h5>
              <p className="block my-2">
                <span className="text-sky-900 font-bold">Nome: </span> {pedido?.client.name} | 
                <span className="text-sky-900 font-bold"> CPF: </span> {pedido?.client.cpf}
              </p>
              <p className="block my-2">
                <span className="text-sky-900 font-bold">E-mail: </span> {pedido?.client.email_address} | 
                <span className="text-sky-900 font-bold"> Telefone: </span> {pedido?.client.phone_number} 
              </p>
            </div>
            <div className="w-[350px]">
              <h5 className="block font-bold text-lg my-2"><span className="text-sky-900">Informações do Vendedor</span></h5>
              <p className="block my-2">
                <span className="text-sky-900 font-bold">Nome: </span> {pedido?.employee.name} 
              </p>
              <p className="block my-2">
                <span className="text-sky-900 font-bold"> Função: </span> {pedido?.employee.role.description}
              </p>
            </div>
          </div>
          <div className="border-4 border-sky-200 border-t-sky-800 rounded-lg py-4 px-1 flex justify-start items-center flex-col">
            <h5 className="block font-bold text-lg my-2 text-center"><span className="text-sky-900">Itens do pedido</span></h5>
            <div className="my-5 px-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 self-center ">
              {pedido?.products_order.map(item => {
                return (
                  <CardItem key={item.product.product_id} 
                    category={item.product.category.description}
                    img={item.product.image_url}
                    price={item.product.price}
                    title={item.product.name}
                    onClick={() => navigate(`/produto/${item.product.product_id}`)}
                    amount={item.amount}
                  />
                )
              })}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}