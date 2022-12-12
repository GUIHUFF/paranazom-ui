import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../components/ButtonsInputs";
import CardItem from "../../../components/CardItem";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import api from "../../../configs/api";
import { AuthProps, getAuth, isAuthenticated } from "../../../configs/auth";
import { PedidoProps, ProductProps } from "../../../configs/interfaces";
import * as Dialog from '@radix-ui/react-dialog';
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface RowsProps {
  name: string;
  price: number;
  description: string;
  category: string;
  tags: string;
  amount: number;
}

export default function DetalhesPedido () {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<AuthProps>();
  const [pedido, setPedido] = useState<PedidoProps>();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [productsSelect, setProductSelect] = useState<string[]>();
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const [rows, setRows] = useState<RowsProps[]>([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150, hideable: false,  },
    {
      field: 'name',
      headerName: 'Nome',
      width: 250,
      editable: false,
      hideable: false,

    },
    {
      field: 'price',
      headerName: 'Preço',
      type: 'number',
      width: 130,
      editable: false,
      hideable: false,

    },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 150,
      editable: false,
      hideable: false,
    },
    {
      field: 'category',
      headerName: 'Categoria',
      width: 150,
      editable: false,
      hideable: false,
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 150,
      editable: false,
      hideable: false,
    },
    {
      field: 'amount',
      headerName: 'Qnt',
      type: 'number',
      width: 70,
      editable: false,
      hideable: false
    },
  ];


  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated()){
      const user = getAuth();
      setAuthUser(JSON.parse(user!));
    }else{
      toast('Você não está em uma conta!', {
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
  }, []);

  useEffect(() => {
    if(authUser){
      api.get(`/orders/${id}`, {auth: authUser}).then(resp => {
        if(resp.status == 200){
          setPedido(resp.data);
        }      
      }).catch(err => {});
    }
    setLoading(false);
  }, [authUser]);

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    setLoading(true);
    await api.get('/products').then(resp => {
      if(resp.status === 200){
        setProducts(resp.data as ProductProps[]);
      }
    }).catch(err => {
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
      navigate('/pedidos');
    });
    setLoading(false);
  }

  useEffect(() => {
    let sum = 0;
    if(pedido){
      pedido.products_order.forEach(e => {
        sum += e.product.price;
      });
      setTotal(sum);
    }
  }, [pedido])

  useEffect(() => {
    const list = [] as RowsProps[];
    if(products){
      products.forEach((value) => {
        if(value.amount > 0){
          list.push({
            id: value.product_id,
            name: value.name,
            amount: value.amount,
            category: value.category.description,
            description: value.description,
            price: value.price,
            tags: value.tags,
          } as RowsProps);
        }
      });
    }
    setRows(list);
  }, [products]);

  const handleSubmit = async () => {
    setDisableButton(true);
    if(productsSelect){
      await productsSelect.forEach( async product => {
        await api.post('/ordersProducts', {
          order: {
            order_id: pedido?.order_id
          },
          product: {
            product_id: product
          },
          amount: 1
        }, {auth: authUser}).then(resp => {
          
        }).catch(err => {
          toast.error(`Falha ao cadastrar o produto! ${product}`, {
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
      });

      toast.success(`Produtos cadastrados`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      window.location.reload(); 
    }else{
      toast.warn(`Nem um produto selecionado`, {
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
    setDisableButton(false);
  }

  const handleDraft = async () => {
    await api.put(`/orders/${id}/draft`, {} ,{auth: authUser}).then(resp => {
      if(resp.status === 204){
        toast.success(`Pedido finalizado`, {
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
      setPedido({...pedido, draft: false});
    }).catch(err => {
    });

  }

  const handlePaid = async () => {
    await api.put(`/orders/${id}/paid`, {}, {auth: authUser}).then(resp => {
      if(resp.status === 204){
        toast.success(`Pagamento Realizado`, {
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
      setPedido({...pedido, paid: true});
    }).catch(err => {
    });
  }

  const handleWithdrawn = async () => {
    await api.put(`/orders/${id}/withdrawn`, {}, {auth: authUser}).then(resp => {
      if(resp.status === 204){
        toast.success(`Pedido Retirado`, {
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
      setPedido({...pedido, withdrawn: true});
    }).catch(err => {
    });;

  }


  if(loading){
    return (<div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>)
  }
 
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="container min-h-[calc(100vh-140px)] flex flex-col m-auto justify-start items-start gap-2 my-3">
        <div className="w-11/12 m-auto bg-zinc-50 rounded-lg p-3 flex flex-col justify-start gap-2">
          <h1 className="block text-center font-bold text-3xl">Informações do Pedido</h1>
          <div className="border-4 border-sky-200 border-t-sky-800 rounded-lg py-4 px-1">
            <h5 className="block font-bold text-lg my-2"><span className="text-sky-900">ID: </span>{pedido?.order_id} </h5>
            <p className="block  text-lg my-2"><span className="text-sky-900 font-bold">Descrição: </span>{pedido?.description}</p>
            <p className="block  text-lg my-2">
              <span className="text-sky-900 font-bold">Status:</span> {pedido?.draft ? "Em aberto" : 
              !pedido?.draft && !pedido?.paid ? "Aguardando pagamento" :
              pedido?.paid && !pedido.withdrawn ? "Aguardando retirada" :
              "Pedido retirado"
              }
            </p>
            <p className="block text-lg my-2"><span className="text-sky-900 font-bold">Desconto: </span>{pedido?.discount}</p>
          </div>
          <div className="border-4 border-sky-200 border-t-sky-800 rounded-lg py-4 px-1 flex flex-wrap justify-between">
            <div>
              <h5 className="block font-bold text-lg my-2"><span className="text-sky-900">Informações do Cliente</span></h5>
              <p className="block my-2">
                <span className="text-sky-900 font-bold">Nome: </span> {pedido?.client.name} | 
                <span className="text-sky-900 font-bold"> CPF: </span> {pedido?.client.cpf}
              </p>
              <p className="block my-2">
                <span className="text-sky-900 font-bold">E-mail: </span> {pedido?.client.email_address} | 
                <span className="text-sky-900 font-bold"> Telefone: </span> {pedido?.client.phone_number} 
              </p>
            </div>
            <div className="w-[350px]">
              <h5 className="block font-bold text-lg my-2"><span className="text-sky-900">Informações do Vendedor</span></h5>
              <p className="block my-2">
                <span className="text-sky-900 font-bold">Nome: </span> {pedido?.employee.name} 
              </p>
              <p className="block my-2">
                <span className="text-sky-900 font-bold"> Função: </span> {pedido?.employee.role.description}
              </p>
            </div>
          </div>
          <div className="border-4 border-sky-200 border-t-sky-800 rounded-lg py-4 px-1 flex justify-start items-center flex-col">
            <h5 className="block font-bold text-lg my-2 text-center"><span className="text-sky-900">Itens do pedido</span></h5>
            <div className="my-5 px-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 self-center ">
              {pedido?.products_order.map(item => {
                return (
                  <CardItem key={item.product_order_id} 
                    category={item.product.category.description}
                    img={item.product.image_url}
                    price={item.product.price}
                    title={item.product.name}
                    onClick={() => navigate(`/produto/${item.product.product_id}`)}
                    amount={item.amount}
                  />
                )
              })}
            </div>
            {pedido?.draft ? 
              <Dialog.Root>
                <Dialog.Trigger asChild><Button >Adicionar Item</Button></Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
                    <Dialog.Content className="fixed bg-zinc-800 py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg min-w-[480px] w-9/12 max-w-[1200px] shadow-lg shadow-black/25">
                      <Dialog.Title className="text-3xl font-black text-center">Adicionar Itens</Dialog.Title>
                      <div className=" w-full bg-zinc-100 rounded-lg shadow my-2">
                        <Box sx={{ height: 380, width: '100%' }}>
                          <DataGrid 
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            onSelectionModelChange={(newSelectionModel) => {
                              setProductSelect(newSelectionModel as string[]);
                            }}
                            selectionModel={productsSelect}
                          />
                        </Box>
                      </div>
                      <div className="flex justify-end gap-4">
                        <Button onClick={handleSubmit} disabled={disableButton} className="text-zinc-900 w-40 disabled:bg-zinc-500 disabled:text-zinc-50">Enviar</Button>
                      </div>
                    </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root> 
            : <Button disabled className="disabled:bg-zinc-500 disabled:text-zinc-50" >Pedido fechado</Button>}
          </div>
          <div className="border-4 border-sky-200 border-t-sky-800 rounded-lg py-4 px-2 flex justify-between items-center">
            <div className="flex justify-start items-start flex-col">
              <h5 className="block font-bold text-lg my-2 text-left"><span className="text-sky-900">Valor Total sem Desconto: </span><span>R$ {total}</span></h5>
              <h5 className="block font-bold text-lg my-2 text-left"><span className="text-sky-900">Valor Total com Desconto: </span><span>R$ {pedido?.discount ? (total - pedido?.discount) : total}</span></h5>
            </div>
            <div>
              {pedido?.draft ? <Button onClick={handleDraft} >Fechar Pedido</Button> : 
              !pedido?.draft && !pedido?.paid ? <Button onClick={handlePaid} >Realizar Pagamento</Button> :
              pedido?.paid && !pedido.withdrawn ? <Button onClick={handleWithdrawn} >Realizar Retirada</Button> :
              <span className="p-4 bg-zinc-300 rounded-lg text-sky-600 font-bold">Pedido Retirado</span>
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}