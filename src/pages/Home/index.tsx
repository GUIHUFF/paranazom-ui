import Header from "../../components/Header";
import logo from "../../assets/logo.png";
import Banner from "../../components/Banner";

export default function Home () {
  return (
    <>
      <Header />
      <Banner img={logo} textStrong="Sistema Paranazom" textThin="Sejá bem-vindo!" position="left"/>
    </>
  )
}