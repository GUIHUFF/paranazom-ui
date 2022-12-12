import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input } from "../../../components/ButtonsInputs";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import api from "../../../configs/api";
import { AuthProps, getAuth, isAuthenticated } from "../../../configs/auth";
import { ClientProps } from "../../Clientes";

interface RowsCliProps {
  id: string;
  name: string;
  cpf: string;
}

interface RowsEmpProps {
  id: string;
  name: string;
  role: string;
}

interface EmployeeProps {
  employee_id: string;
	name: string;
	entry_date: string;
	is_active: boolean;
	role: {
			role_id: string;
			description: string;
	};
  user: any;
}

export default function NovoPedido () {
  const [loading, setLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<AuthProps>();
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [employees, setEmployees] = useState<EmployeeProps[]>([])
  
  const [clientSelect, setClientSelect] = useState<string>('');
  const [employeesSelect, setEmployeesSelect] = useState<string>('');
  const [description, setDescription] = useState<string>('');


  const [rowsCli, setRowsCli] = useState<RowsCliProps[]>([]);
  const [rowsEmp, setRowsEmp] = useState<RowsEmpProps[]>([]);


  const navigate = useNavigate();
  const columnsCli: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'name',
      headerName: 'Nome',
      width: 260,
      editable: false,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 150,
      editable: false,
    },
  ];

  const columnsEmp: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'name',
      headerName: 'Nome',
      width: 260,
      editable: false,
    },
    {
      field: 'role',
      headerName: 'Função',
      width: 150,
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
    api.get('/employees', {auth: authUser}).then(resp => {
      if(resp.status == 200){
        setEmployees(resp.data);
      }      
    }).catch(err => {});
  }, [authUser]);

  useEffect(() => {
    const list = [] as RowsCliProps[];
    clients.forEach((value) => {
      list.push({
        id: value.client_id,
        name: value.name,
        cpf: value.cpf,
      } as RowsCliProps);
    });
    setRowsCli(list);
    setLoading(false);
  }, [clients]);

  useEffect(() => {
    const list = [] as RowsEmpProps[];
    employees.forEach((value) => {
      if(value.is_active){
        list.push({
          id: value.employee_id,
          name: value.name,
          role: value.role.description,        
        } as RowsEmpProps);
      }
    });
    setRowsEmp(list);
    setLoading(false);
  }, [employees]);

  const handleSubmit = async () => {
    setLoading(true);
    if(handleValidate()){
      toast('Enviando...!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      const body = {
        draft: true,
        paid: false,
        withdrawn: false,
        description,
        employee: {
          employee_id: employeesSelect
        },
        client: {
          client_id: clientSelect
        }
      }
      await api.post('/orders', body, {auth: authUser}).then(resp => {
        toast.success('Novo pedido criado...!', {
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
      }).catch(err => {
        toast.error('Falha ao enviar!', {
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
    }else{
      toast.error('Selecione um cliente e um funcionário!', {
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
    setLoading(false);
  }

  const handleValidate = () => {
    return employeesSelect && clientSelect ? true : false;
  }

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
          <h1 className="text-sky-900 text-4xl font-thin">Novo Pedido</h1>
        </div>
        <div className="w-full flex flex-col gap-1 flex-wrap justify-center items-center my-5">
          <h2 className="font-bold text-xl">Clientes</h2>
          <div className=" max-w-[600px] w-full bg-zinc-100 rounded-lg shadow">
            <Box sx={{ height: 350, width: '100%' }}>
              <DataGrid
                rows={rowsCli}
                columns={columnsCli}
                pageSize={4}
                rowsPerPageOptions={[4]}
                onSelectionModelChange={(model) => {setClientSelect(model[0] as string)}}
              />
            </Box>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1 flex-wrap justify-center items-center my-5">
          <h2 className="font-bold text-xl">Funcionários</h2>
          <div className=" max-w-[600px] w-full bg-zinc-100 rounded-lg shadow">
            <Box sx={{ height: 350, width: '100%' }}>
              <DataGrid
                rows={rowsEmp}
                columns={columnsEmp}
                pageSize={4}
                rowsPerPageOptions={[4]}
                onSelectionModelChange={(model) => {setEmployeesSelect(model[0] as string)}}
              />
            </Box>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1 flex-wrap justify-center items-center my-5">
          <h2 className="font-bold text-xl">Descrição</h2>
          <div className=" max-w-[600px] w-full bg-zinc-100 rounded-lg shadow p-2">
            <label className="flex flex-col gap-2 text-zinc-900">
              Descrição do pedido
            <Input className="" placeholder="Digite uma descrição" value={description} onChange={e => setDescription(e.target.value) }/>
            </label>
          </div>
        </div>
        <div className="self-center max-w-[600px] w-full bg-zinc-100 rounded-lg shadow p-2 mb-10">
          <Button className="w-full" onClick={handleSubmit}>Abrir Pedido</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}