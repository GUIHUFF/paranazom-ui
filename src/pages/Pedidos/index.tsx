import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/ButtonsInputs";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import api from "../../configs/api";
import { AuthProps, getAuth, isAuthenticated } from "../../configs/auth";


interface RowsProps {
  id: string;
  client: string;
  draft: string;
  paid: string;
  withdrawn: string;
  employee: string;
  to: string;
  items: number;
}

export default function Pedidos () {
  const [loading, setLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<AuthProps>();
  const [pedidos, setPedidos] = useState<any[]>([]);

  const [rows, setRows] = useState<RowsProps[]>([]);

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    
    {
      field: 'client',
      headerName: 'Cliente',
      width: 260,
      editable: false,
    },
    {
      field: 'draft',
      headerName: 'Aberto?',
      width: 100,
      editable: false,
      sortable: true,
    },
    {
      field: 'paid',
      headerName: 'Pago?',
      width: 100,
      editable: false,
    },
    {
      field: 'withdrawn',
      headerName: 'Retirado?',
      width: 100,
      editable: false,
    },
    {
      field: 'employee',
      headerName: 'Vendedor',
      width: 260,
      editable: false,
    },
    {
      field: 'items',
      headerName: 'qnt Itens',
      width: 100,
      editable: false,
    },
    {
      field: 'to',
      headerName: 'Ver completo',
      description: 'Ver detalhes do pedido',
      width: 140,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (cellValues) => {
        return (
          <Button
            disabled={!cellValues.row.to}
            onClick={() => {
              navigate(`/pedido/${cellValues.row.to}`);
            }}
          >
            Ver
          </Button>
        );
      },
    },
  ];

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
    api.get('/orders', {auth: authUser}).then(resp => {
      if(resp.status == 200){
        setPedidos(resp.data);
      }      
    }).catch(err => {});
  }, [authUser]);

  useEffect(() => {
    const list = [] as RowsProps[];
    let id = 0;
    pedidos.forEach((value) => {
      id += 1;
      list.push({
        id: value.order_id,
        client: value.client.name,
        draft: value.draft ? 'Sim' : 'Não',
        paid: value.paid ? 'Sim' : 'Não',
        withdrawn: value.withdrawn ? 'Sim' : 'Não',
        employee: value.employee.name,
        to: value.order_id,
        items: value.products_order.length,
      } as RowsProps);
    });
    setRows(list);
    setLoading(false);
  }, [pedidos]);

  if(loading){
    return (<div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>)
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="container min-h-[calc(100vh-140px)] flex flex-col m-auto justify-start items-start">
        <div className="mt-5 w-full bg-zinc-100 rounded-lg shadow">
          <Box sx={{ height: 700, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20, 40, 80]}
              initialState={{
                sorting: {
                  sortModel: [
                    {
                      field: 'draft',
                      sort: 'desc',
                    },
                  ],
                },
              }}
            />
          </Box>
        </div>
        <div className="w-full my-2 flex justify-center items-center">
          <Button onClick={() => navigate('/novo-pedido')} className="bg-sky-900 text-white hover:scale-125 hover:bg-sky-700">Novo Pedido</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}