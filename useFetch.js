import { useEffect, useState } from "react"


const localCache = {};


export const useFetch = (url) => {

  const [state, setState] = useState({
    data: null,
    loading: true,
    hasError: null,
    error: null
  });

  //¿por qué se hace en un useEffect el fetch?
  //Porque asi se hace solo cuando cambia la url o se inicia la primera
  //vez, no cada vez que se renderiza el componente
  useEffect(() => {
    getFetch();
  }, [url])

  const setLoadingState = () => {
    setState({
      data: null,
      loading: true,
      hasError: null,
      error: null
    });
  }

  const getFetch = async () => {

    if (localCache[url]) {
      console.log('Usando cache');
      setState({
        data: localCache[url],
        loading: false,
        hasError: false,
        error: null
      });
      return;
    }

    setLoadingState();

    const resp = await fetch(url);

    if (!resp.ok) {
      setState({
        data: null,
        loading: false,
        hasError: true,
        error: 'No se pudo cargar la info'
      });
      return;
    }

    const data = await resp.json();

    setState({
      data,
      loading: false,
      hasError: false,
      error: null
    });

    localCache[url] = data;
  }

  return {
    data: state.data,
    isLoading: state.loading,
    hasError: state.hasError,
  }
}