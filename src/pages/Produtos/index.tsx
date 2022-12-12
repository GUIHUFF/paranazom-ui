import { CircularProgress, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CardItem from "../../components/CardItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import api from "../../configs/api";
import { ProductFilterProps, ProductProps } from "../../configs/interfaces";

export default function Produtos () {
  const [itemsNumber, setItemsNumber] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductProps[]>([]);

  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    handleGet();
  }, [page, rowsPerPage])

  const handleGet = async () => {
    setLoading(true);
    await api.get('/products/filter', {params: {size: rowsPerPage, page: page}}).then(resp => {
      if(resp.status === 200){
        setProducts(resp.data.content as ProductProps[]);
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
      navigate('/');
    });
    setLoading(false);
  }

  useEffect(() => {
    try{
      api.get('/products/filter', {params: {size: rowsPerPage, page: page}}).then(resp => {
        if(resp.status === 200){
          setItemsNumber(resp.data.totalElements);
          setProducts(resp.data.content as ProductProps[]);
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
        navigate('/');
      });
    }catch(err){
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
      navigate('/');
    }
    setLoading(false);
  }, []);



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
          <h1 className="text-sky-900 text-4xl font-thin">Produtos</h1>
        </div>
        <div className="my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 self-center">
          {products.map(product => {
            return (
              <CardItem key={product.product_id} 
                category={product.category.description}
                img={product.image_url}
                price={product.price}
                title={product.name}
                onClick={() => navigate(`/produto/${product.product_id}`)}
                amount={product.amount}
              />
            )
          })}
        </div>
        <div className="w-full flex justify-center m-4" >
          <TablePagination
            component="div"
            className="text-lg text-zinc-900"
            count={itemsNumber}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[12, 24, 48, 96]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={"Items por página"}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}