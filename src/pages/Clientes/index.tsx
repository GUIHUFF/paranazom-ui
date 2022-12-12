import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from "@mui/system";
import api from "../../configs/api";
import { AuthProps, getAuth, isAuthenticated } from "../../configs/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface ClientProps {
  client_id: string; 
  name: string;
  rg: string | null; 
  cpf: string;
  phone_number: string; 
  email_address: string; 
  address: string | null;
}

interface RowsProps {
  id: string;
  firstName: string;
  lastName: string;
  cpf: string;
  phone_number: string;
  email_address: string;
  address: string;
}


export default function Clientes () {
  const [loading, setLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<AuthProps>();
  const [clients, setClients] = useState<ClientProps[]>([]);

  const [rows, setRows] = useState<RowsProps[]>([]);


  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'Nome',
      width: 260,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Sobrenome',
      width: 170,
      editable: false,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 150,
      editable: false,
    },
    {
      field: 'phone_number',
      headerName: 'Telefone',
      width: 150,
      editable: false,
    },
    {
      field: 'email_address',
      headerName: 'E-mail',
      width: 260,
      editable: false,
    },
    {
      field: 'address',
      headerName: 'Endereço',
      width: 400,
      editable: false,
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
    api.get('/clients', {auth: authUser}).then(resp => {
      if(resp.status == 200){
        setClients(resp.data.content);
        
      }      
    }).catch(err => {});
  }, [authUser]);

  useEffect(() => {
    const list = [] as RowsProps[];
    let id = 0;
    clients.forEach((value) => {
      id += 1;
      const [firstName, lastName] = value.name.split(" ");
      list.push({
        id: value.client_id,
        firstName,
        lastName,
        cpf: value.cpf,
        address: value.address,
        email_address: value.email_address,
        phone_number: value.phone_number,
      } as RowsProps);
    });
    setRows(list);
    setLoading(false);
  }, [clients]);

  if(loading){
    return (<div className="flex justify-center items-center h-screen">
      <CircularProgress />
    </div>)
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="container min-h-[calc(100vh-140px)] flex flex-col m-auto justify-start items-start">
        <div className="p-2 min-h-[80px] bg-zinc-100 rounded-lg max-w-[500px] min-w-[300px] w-11/12 self-center shadow flex text-center justify-center items-center">
          <h1 className="text-sky-900 text-4xl font-thin">Clientes</h1>
        </div>
        <div className="mt-5 w-full bg-zinc-100 rounded-lg shadow">
        <Box sx={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20, 40, 80]}
          />
          </Box>
        </div>


      </div>
      <Footer />
    </div>
  )
}