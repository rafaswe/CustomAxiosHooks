import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxios = (url, method, parameter) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        let response;

        if (method === 'get') {
          response = await axios.get(url, { cancelToken: source.token });
        } else if (method === 'getById') {
          response = await axios.get(`${url}/${parameter}`, { cancelToken: source.token });
        } else if (method === 'getByCategory') {
          const key = Object.keys(parameter)[0];
          const value = parameter[key];
          response = await axios.get(`${url}/?${key}=${value}`, { cancelToken: source.token });
        } else if (method === 'post') {
          response = await axios.post(url, parameter, { cancelToken: source.token });
          console.log('Data has been posted');
        } else if (method === 'put') {
          response = await axios.put(`${url}/${parameter.id}`, parameter.data, { cancelToken: source.token });
          console.log('Data has been Updated');
        } else if (method === 'patch') {
          response = await axios.patch(`${url}/${parameter.id}`, parameter.data, { cancelToken: source.token });
        } else if (method === 'deleteOne') {
          response = await axios.delete(`${url}/${parameter}`, { cancelToken: source.token });
        } else if (method === 'deleteAll') {
          response = await axios.delete(url, { cancelToken: source.token });
        } else {
          throw new Error(`Invalid Axios method: ${method}`);
        }

        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

    return () => {
      source.cancel('Request canceled by cleanup');
    };
  }, []);

//   url, method, parameter

  return { data, error };
};

export default useAxios;
