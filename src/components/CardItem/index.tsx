import { Button } from "../ButtonsInputs";
import plus from "../../assets/icons/icon-plus-outline.svg";

interface CardItemProps {
  img?: string;
  title: string;
  price: number;
  category: string;
}

export default function CardItem ({ img, title, price, category }:CardItemProps) {
  return (
  <div className="h-80 w-56 bg-zinc-100 p-2 rounded-lg shadow">
    <img className="w-full h-36 object-cover" alt="imagem do produto" src={img ? img : "https://img.icons8.com/carbon-copy/512/no-image.png"} />
    <div className="flex relative flex-col justify-between h-[160px]">
      <h3 className="text-center font-semibold">{title}</h3>
      <div className="flex justify-between items-center"><span className="">{category}</span><h5 className="font-semibold bg-sky-800 text-white p-2 rounded-lg"> R$ {price}</h5></div>
      <Button className="w-12 h-12 self-center"><img src={plus} /></Button>
    </div>
  </div>
  );
}