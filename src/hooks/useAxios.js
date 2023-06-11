import axios from 'axios';
import { useEffect, useState } from 'react';



const useAxios = (url, method, parameter) => {

  const [errorMessage,setErrorMessage]= useState("");

    const [data,setData]= useState([]);
    const [haveError,setHaveError]= useState(false);
    const [loading,setLoading]= useState(false)

  const axiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 5000
  });
  
  axiosInstance.interceptors.request.use((config)=>{

    setHaveError(false)
    setLoading(true)
        return config;
       
    },(error)=>{

        if(error.message ==='Network Error'){
            setErrorMessage("Network Error..Please check your Internet connection");
        }
        else if(error.message ==='Bad Request'){
                    setErrorMessage("Bad request");
        }
        else if(error.message ==='Unauthorized'){
                            setErrorMessage("Access Denied");
                }
        else if(error.message ==='Forbidden'){
                            setErrorMessage("Access Denied");
                }
        else if(error.message ==='Not Found'){
                            setErrorMessage("server-side error occurred");
                }
        else if(error.message ==='Timeout Error'){
                            setErrorMessage("server does not respond");
                }
        else{
            setErrorMessage("Something went wrong. Please try again later")
        }
        setHaveError(true)
        setLoading(false)
    })

    axiosInstance.interceptors.response.use((response)=>{
      setHaveError(false)
      setLoading(false)
      return response;
      },(error)=>{
  
          if (error.response) {
              const { status } = error.response;
        
              // Handle specific status codes
              if (status === 401) {
                setErrorMessage('Unauthorized error');
              } else if (status === 404) {
                setErrorMessage('The requested resource is not found on the server');
              } else {
                setErrorMessage('something went wrong');
              }
            } else {
              setErrorMessage('Network error occurred');
            }  
            
            setHaveError(true)
            setLoading(false)
      })
  

  useEffect(() => {
    let source = axios.CancelToken.source();
   

    const fetchData = async () => {
      try {
        let response;

        if (method === 'get') {
          response = await axiosInstance.get(url, { cancelToken: source.token });
        } else if (method === 'getById') {
          response = await axiosInstance.get(`${url}/${parameter}`, { cancelToken: source.token });
        } else if (method === 'getByCategory') {
          const key = Object.keys(parameter)[0];
          const value = parameter[key];
          response = await axiosInstance.get(`${url}/?${key}=${value}`, { cancelToken: source.token });
        } else if (method === 'post') {
          response = await axiosInstance.post(url, parameter, { cancelToken: source.token });
          console.log('Data has been posted');
        } else if (method === 'put') {
          response = await axiosInstance.put(`${url}/${parameter.id}`, parameter.data, { cancelToken: source.token });
          console.log('Data has been Updated');
        } else if (method === 'patch') {
          response = await axiosInstance.patch(`${url}/${parameter.id}`, parameter.data, { cancelToken: source.token });
        } else if (method === 'deleteOne') {
          response = await axiosInstance.delete(`${url}/${parameter}`, { cancelToken: source.token });
        } else if (method === 'deleteAll') {
          response = await axiosInstance.delete(url, { cancelToken: source.token });
        } else {
          throw new Error(`Invalid Axios method: ${method}`);
        }

        setData(response.data);
      } catch (error) {
        setHaveError(true)
        setLoading(false)
      }
    };

    fetchData();

    return () => {
      source.cancel('Request canceled by cleanup');
    };
  }, [url,method]);
  

  return { data,loading, haveError,errorMessage };
};

export default useAxios;
