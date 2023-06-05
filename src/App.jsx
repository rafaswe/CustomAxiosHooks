// import './App.css'

import useAxios from "./hooks/useAxios"

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
  const {data}= useAxios("https://fakestoreapi.com/products","get")

  // Getting data by ID 
  const {data:singleProductFData}= useAxios("https://fakestoreapi.com/products","getById",1)
  
  // console.log(data)

 

  // Posting data 
  const {data:postData}= useAxios('https://fakestoreapi.com/products',"post",productData)

  
  // Updating data 
  const {data:singleProductUpdate}= useAxios("https://fakestoreapi.com/products","put",updateSingleProduct)

  
  // Patching data 
  const {data:singleProductPatch}= useAxios("https://fakestoreapi.com/products","patch",patchSingleProduct)

  return (
    <div>
      <div className="">
        <h1>All product</h1>
        {
          data && data.map((item) => <p key={item.id}>{item.id}-{item.title}</p>)
        }
      </div>
      

      <div>
        <h1>Single Product</h1>
        {
          singleProductFData && <p>{singleProductFData.title}</p>
        }
      </div>


      <div>
        <h1>After Posting Data</h1>
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
        {
          singleProductUpdate && <p>After Update = {singleProductUpdate.title}</p>
        }
      </div>



      <div>
        <h1>Patching Data</h1>
        {
          singleProductPatch && <p>After Patch = {singleProductPatch.price}</p>
        }
      </div>
    </div>
  )
}

export default App
