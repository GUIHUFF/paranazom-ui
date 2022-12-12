
import "./styles/main.css";
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

import RouterApp from "./routes/routes";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <div className="">
      <RouterApp />
      <ToastContainer />
    </div>
  )
}

export default App
