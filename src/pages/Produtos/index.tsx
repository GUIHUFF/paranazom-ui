import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CardItem from "../../components/CardItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import api from "../../configs/api";

export default function Produtos () {
  const [pagesNumber, setPageNumber] = useState<number>(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try{
      api.get('/products').then(resp => {
        if(resp.status === 200){
          setPageNumber(resp.data.length);
        }
      })
      .catch(err => {
        toast.warn('Falha ao carregar os produtos!', {
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
      });
    }catch(err){
      toast.warn('Falha ao carregar os produtos!', {
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
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="container min-h-[calc(100vh-140px)] flex flex-col m-auto justify-start items-start">
        <div className="p-2 min-h-[80px] bg-zinc-100 rounded-lg max-w-[500px] min-w-[300px] w-11/12 self-center shadow flex text-center justify-center items-center">
          <h1 className="text-sky-900 text-4xl font-thin">Produtos</h1>
        </div>
        <div className="my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 self-center">
          <CardItem img="" title="Teste Com uma texte grade" price={1300} category="Celular" /> 
          <CardItem img="" title="Teste Com uma texte grade" price={1300} category="Celular" />
          <CardItem img="" title="Teste Com uma texte grade" price={1300} category="Celular" />
          <CardItem img="" title="Teste Com uma texte grade" price={1300} category="Celular" />
          <CardItem img="" title="Teste Com uma texte grade" price={1300} category="Celular" />
          <CardItem img="" title="Teste Com uma texte grade" price={1300} category="Celular" />
          <CardItem img="" title="Teste Com uma texte grade" price={1300} category="Celular" />
          <CardItem img="" title="Teste Com uma texte grade" price={1300} category="Celular" />
          <CardItem img="" title="Teste Com uma texte grade" price={1300} category="Celular" />
        </div>
      </div>

      <Footer />
    </div>
  )
}