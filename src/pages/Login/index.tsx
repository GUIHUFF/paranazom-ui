import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import logo from "../../assets/logo.png";
import { Button, Input } from "../../components/ButtonsInputs";
import { FormEvent, useEffect, useState } from "react";
import api from "../../configs/api";
import { toast } from 'react-toastify';
import { isAuthenticated, setAuth } from "../../configs/auth";
import { useNavigate } from "react-router-dom";

export default function Login () {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated()){
      toast('Você já está logado em uma conta!', {
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
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    try{
      const response = await api.get("/categories", {
        auth: {
          username: email,
          password: password
        }
      })
      .catch(error => {
        toast.error('Erro interno, tente mais tarde!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
      if(response){
        setAuth({username: email, password});
        toast.success('Bem-vindo e boas vendas!', {
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
      } else {
        toast.error('E-mail ou senha incorretos!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      
    }catch(err){
      toast.error('Erro interno, tente mais tarde!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setSubmit(false);
  }



  return (
    <div className="flex flex-col justify-between min-h-screen m-auto">
      <Header />
      <div className="container m-auto flex items-center justify-center flex-col md:flex-row gap-10">
        <Banner textStrong="Faça o Login agora" textThin="e venda o máximo que conseguir!" img={logo} position="bottom" imgHidden/>
        <div className="bg-sky-900 min-w-[330px] md:w-3/6 w-11/12 max-w-[550px] rounded-xl flex items-center">
          <form className="flex w-full min-h-[260px] h-full justify-around gap-3 flex-col p-3" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-white">
              E-mail:
              <Input type="text" placeholder="email"
                value={email} onChange={(e) => {
                  setEmail(e.target.value)
                }} 
              />
            </label>
            <label className="flex flex-col gap-2 text-white">
              Senha:
              <Input type="password" placeholder="senha"
                value={password} onChange={(e) => {
                  setPassword(e.target.value)
                }} 
              />
            </label>
            <Button disabled={submit} type="submit">{submit ? "Enviando..." : "Entrar"}</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}