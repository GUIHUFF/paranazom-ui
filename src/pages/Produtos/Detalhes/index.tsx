import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import api from "../../../configs/api";
import { ProductProps } from "../../../configs/interfaces";

export default function DetalhesProduto () {
  const { id } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true);
  const [produto, setProduto] = useState<ProductProps>();

  const handleGetDetalhesProdutos = async () => {
    await api.get(`products/${id}`).then(resp => {
      if(resp.status === 200){
        setProduto(resp.data);
      }
    }).catch(err => {
      toast.warn('Falha ao carregar o produto!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate('/produtos');
    });
    setLoading(false);
  }

  useEffect(() => {
    handleGetDetalhesProdutos();
  }, []);


  if(loading){
    return (<div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>)
  }

  return (
    <div className="flex flex-col justify-start min-h-screen">
      <Header />
      <div className="container min-h-[calc(100vh-140px)] flex flex-col m-auto justify-start items-start gap-2">
        <div className="p-2 min-h-[80px] bg-zinc-100 rounded-lg min-w-[300px] w-full self-center shadow flex text-center justify-center items-center">
          <h1 className="text-sky-900 text-2xl font-medium"><span className="font-thin">Produtos /</span> {produto?.name}</h1>
        </div>
        <div className="p-2 bg-zinc-100 rounded-lg w-full flex flex-wrap shadow justify-center gap-5">
          <img className=" w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[365px] sm:h-[415px] md:h-[465px] lg:h-[548px] rounded-lg object-contain" src={produto?.image_url} alt={`imagem - ${produto?.name}`}/>
          <div className="w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] rounded-lg flex flex-col justify-between py-5 px-2 gap-2">
            <h4 className="font-black text-3xl block bg-zinc-500 text-sky-100 rounded-lg p-4">{produto?.name} </h4>
            <p className="text-lg text-justify">{produto?.description ? produto?.description.substring(0, 160) : "Desculpa não temos uma descrição"} </p>
            <p><span className="text-zinc-900 font-semibold">Categoria:</span> {produto?.category.description}</p>
            <p className="p-2 bg-sky-50 rounded-lg text-xs font-semibold"><span className="text-sky-900 ">tags:</span> {produto?.tags}</p>
            <p><span className="text-zinc-900 font-semibold">Quantidade em estoque:</span> {produto?.amount}</p>
            <div className="bg-sky-900 rounded-lg w-52 h-20 flex justify-center items-center text-zinc-50 font-bold self-center">R$ {produto?.price}</div>
          </div>
        </div>
        <div className="p-2 bg-zinc-100 rounded-lg w-full flex flex-wrap shadow justify-start items-start gap-1 min-h-[80px] flex-col">
          <h6 className="font-bold">Descrição completa:</h6>
          <p>{produto?.description ? produto?.description : "Desculpa não temos uma descrição"}</p>
        </div>

      </div> 
      <Footer />
    </div>
  )
}