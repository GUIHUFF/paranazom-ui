import { Button } from "../ButtonsInputs";
import eye from "../../assets/icons/eyes.svg";

interface CardItemProps {
  img?: string;
  title: string;
  price: number;
  category: string;
  onClick: () => void;
  amount?: number
}

export default function CardItem ({ img, title, price, category, onClick, amount }:CardItemProps) {
  return (
  <div className="h-80 w-56 bg-zinc-100 p-2 rounded-lg shadow">
    <img className="rounded-lg w-full h-36 object-cover" alt="imagem do produto" src={img ? img : "https://img.icons8.com/carbon-copy/512/no-image.png"} />
    <div className="flex relative flex-col justify-between h-[160px]">
      <h3 className="text-center font-semibold">{title}</h3>
      <div className="flex justify-between items-center"><span className="">{category}</span><h5 className="font-semibold bg-sky-800 text-white p-2 rounded-lg"> R$ {price}</h5></div>
      {amount ? 
        <div className="flex justify-around items-center">
          <span className="text-center w-16 h-12 bg-zinc-50 font-bold rounded-lg text-sky-900">qnt: <br />{amount}</span>
          <Button onClick={onClick} className="w-16 h-12 self-center flex justify-center items-center"><img className="w-12 h-8" src={eye} /></Button>       
        </div>
      : 
        <Button onClick={onClick} className="w-16 h-12 self-center flex justify-center items-center"><img className="w-12 h-8" src={eye} /></Button>
      }
    </div>
  </div>
  );
}