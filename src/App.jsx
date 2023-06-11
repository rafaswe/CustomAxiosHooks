// import './App.css'

import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxios from "./hooks/useAxios";

function App() { 
  

const productData ={
  title: "hobe kono ekta",
  price: 110,
  description: "habijabi",
  category: "men's product",
  image: "https://artincontext.org/wp-content/uploads/2023/04/How-to-Draw-a-Sloth-848x530.jpg",
  rating: {
    rate: 4,
    count: 1258
  }
}

const updateSingleProduct = {
  id:1,
  data:{
    id: 1,
    title: "hello world",
    price: 109.95,
    description: "Your perfect ",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120
    }
  }
}

const patchSingleProduct ={
  id:1,
  data:{
    price: 111,
  }
}


  // Getting all data 
  const {data,loading, haveError,errorMessage}= useAxios("/products","get")


  // Getting data by ID 
  const {data:singleProductFData,haveError:singleProductError,errorMessage:singleErrorMessage}= useAxios("/products","getById",1)
  
  // console.log(data)

 

  // Posting data 
  const {data:postData,haveError:singlePostError,errorMessage:postErrorMessage}= useAxios('/products',"post",productData)

  
  // Updating data 
  const {data:singleProductUpdate,haveError:singleProductUpdateError,errorMessage:updateErrorMessage}= useAxios("/products","put",updateSingleProduct)

  
  // Patching data 
  const {data:singleProductPatch,haveError:singleProductPatchError,errorMessage:patchErrorMessage}= useAxios("/products","patch",patchSingleProduct)


  useEffect(() => {
    if (haveError) {
      notify("All product section = " +errorMessage);
    }
    else if(singleProductError){
      notify("ingle product section = " +singleErrorMessage)
    }
    else if(singlePostError){
      notify("Post product section = " +postErrorMessage)
    }
    else if(singleProductUpdateError){
      notify("Update product section = " +updateErrorMessage)
    }
    else if(singleProductPatchError){
      notify("Patch product section = " +patchErrorMessage)
    }
  }, [haveError, errorMessage,singleProductError,singleErrorMessage,singlePostError,postErrorMessage,singleProductUpdateError,updateErrorMessage,singleProductPatchError,patchErrorMessage]);

  

  const notify = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const loadData = () => {
    toast.warn('Data is loading!', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
  }

  return (
    <div>
      <div className="">
        <h1>All product</h1>
        {loading ? loadData(): data.map((item) => <p key={item.id}>{item.id}-{item.title}</p>)}
      </div>
      

      <div>
        <h1>Single Product</h1>
        {singleProductError && <p>{errorMessage}</p>}
        {
          singleProductFData && <p>{singleProductFData.title}</p>
        }
      </div>


      <div>
        <h1>After Posting Data</h1>
        {singlePostError && <p>{errorMessage}</p>}
        {
          postData && <div>
            <p>Id = {postData.id}</p>
            <p>Tite = {postData.title}</p>
            <p>Price = {postData.price}</p>
            <p>Description = {postData.description}</p>
            <p>Category = {postData.category}</p>
    
            <img src={postData.image} width={"10%"} alt="" />
          </div>
        }
      </div>



      <div>
        <h1>Updating Data</h1>
        {singleProductUpdateError && <p>{errorMessage}</p>}
        {
          singleProductUpdate && <p>After Update = {singleProductUpdate.title}</p>
        }
      </div>



      <div>
        <h1>Patching Data</h1>
        {singleProductPatchError && <p>{errorMessage}</p>}
        {
          singleProductPatch && <p>After Patch = {singleProductPatch.price}</p>
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
