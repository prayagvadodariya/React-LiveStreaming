import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StorageKeys from '../constant/StorageKeys';
import axios from 'axios';
import * as servicesHandler from './services_hendler';

const NEW_BASE_URL = 'https://prayagnetworld301.wixsite.com/productzilla/_api/';
const BASE_URL = 'https://www.wixapis.com/stores/v1/';
const VELO_REFERENCE_URL = 'https://prayagnetworld301.wixsite.com/productzilla/_functions/';


export const getCollections = () => {
  let URL = VELO_REFERENCE_URL + 'storeCollections';
  return axios.get(URL)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    return error.response.data;
  });
}

export const getMux = () => {
  let URL = 'https://stream.mux.com/zN2OgH2b5XKSSV8hkgnSMA88v2R8orkcelirmDTKGW00.m3u8';
  return axios.get(URL)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    return error.response.data;
  });
}

export const getProductList = (parameter) => {
  let URL = VELO_REFERENCE_URL + 'storeProducts';
  return axios.get(URL, { params: parameter })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    return error.response
  });
}

export const getProductDetails = (parameter) => {
  let URL = VELO_REFERENCE_URL + 'storeProductsDetails';
  return axios.get(URL, { params: parameter })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    return error.response.data;
  });
}

export const getdynamicmodelApi = () => {
    let URL = NEW_BASE_URL + 'v2/dynamicmodel';
     return servicesHandler.Get(URL)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error
      });
}

export const loginApi = (Parameter) => {
    let URL = NEW_BASE_URL + 'wix-sm-webapp/v1/auth/login';
       return servicesHandler.Post(URL, Parameter)
        .then(response => {
          return response;
        })
        .catch(error => {
          return error
        });
  }

export const onCollectionsApi = () => {
    let URL = BASE_URL + "collections/query";
       return servicesHandler.PostWithHeader(URL)
        .then(response => {
          return response;
        })
        .catch(error => {
          return error
        });
}

export const onProductsApi = (Parameter) => {
  let URL = BASE_URL + "products/query";
     return servicesHandler.PostWithHeader(URL, Parameter)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error
      });
}

export const onProductsDetailsApi = (Parameter) => {
  let URL = BASE_URL + "products/" + Parameter;
     return servicesHandler.GetWithHeader(URL)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error
      });
}



