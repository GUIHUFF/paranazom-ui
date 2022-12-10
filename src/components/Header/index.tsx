import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Header (){
  return (
    <div className="container mx-auto">
      <NavigationMenu.Root className='relative flex justify-center items-center w-full mt-1 gap-2'>
        <NavigationMenu.List className="flex justify-center items-center p-1 rounded-md list-none m-0"> 
          <NavigationMenu.Item>
            <Link to="/"><img src={logo} className="w-10 h-13"/></Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        <NavigationMenu.List className="flex justify-center items-center bg-white p-1 rounded-md list-none m-0"> 
          <NavigationMenu.Item>
            <Link to="/" className='block text-sm py-2 px-3 rounded text-gray-800 hover:bg-sky-100 mx-1'>Home</Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <Link to="/produtos" className='block text-sm py-2 px-3 rounded text-gray-800 hover:bg-sky-100 mx-1'>Produtos</Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <Link to="/pedidos" className='block text-sm py-2 px-3 rounded text-gray-800 hover:bg-sky-100 mx-1'>Pedidos</Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        <NavigationMenu.List className="flex justify-center items-center bg-white p-1 rounded-md list-none m-0"> 
          <NavigationMenu.Item>
            <button className='block text-sm py-2 px-3 rounded text-gray-800 hover:bg-yellow-100 mx-1'>Sair</button>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  )
}