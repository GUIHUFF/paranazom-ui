import Header from "../../components/Header";
import logo from "../../assets/logo.png";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import { Button } from "../../components/ButtonsInputs";
import { useNavigate } from "react-router-dom";

export default function Home () {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <Banner img={logo} textStrong="Sistema Paranazom" textThin="Sejá bem-vindo!" position="left"/>
      <div className="container mx-auto h-auto flex flex-col items-center m-10 gap-5 p-10">
        <p className="font-bold text-xl">Esse sistema é destinado aos funcionários do Paranazom!</p>
        <p className="font-semibold text-lg">Se você é um funcionário realize login aqui: </p> 
        <Button onClick={handleClick} className="max-w-[300px] w-full font-semibold text-lg">Entrar</Button>
        <p className="font-normal text-lg">Se não for um funcionário, visite uma de nossas lojas ou entre em contato com algum funcionário! </p>
      </div>
      <Footer />
    </div>
  )
}