import axios from "axios";
import {
  DataProvider,
  HttpError,
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteOneParams,
  DeleteOneResponse,
  BaseRecord,
} from "@refinedev/core";
import { stringify } from "query-string";

// Error handling with axios interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export const dataProvider = (apiUrl: string): DataProvider => ({
  getList: async ({ resource }) => {
    const url = `${apiUrl}/${resource}`;

    const { data, headers } = await axiosInstance.get(url);


    const total = +headers["x-total-count"];

    return {
      data,
      total,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await axiosInstance.get(url);
    return { data };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;
    const response = await axiosInstance.post(url, variables);
    return { data: response.data };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const response = await axiosInstance.put(url, variables);
    return { data: response.data };
  },
  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.delete(url, {
        data: variables,
    });

    return {
        data,
    };
},
  
  

  getApiUrl: () => apiUrl,
});
