import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import logo from "../../assets/logo.png";
import { Button, Input } from "../../components/ButtonsInputs";

export default function Login () {
  return (
    <div className="flex flex-col justify-between min-h-screen m-auto">
      <Header />
      <div className="container m-auto flex items-center justify-center flex-col md:flex-row gap-10">
        <Banner textStrong="Faça o Login agora" textThin="e venda o máximo que conseguir!" img={logo} position="bottom" imgHidden/>
        <div className="bg-sky-900 min-w-[330px] md:w-3/6 w-11/12 max-w-[550px] rounded-xl flex items-center">
          <form className="flex w-full min-h-[260px] h-full justify-around gap-3 flex-col p-3 ">
            <label className="flex flex-col gap-2 text-white">E-mail:<Input placeholder="email"/></label>
            <label className="flex flex-col gap-2 text-white">Senha:<Input placeholder="senha"/></label>
            <Button>Entrar</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}