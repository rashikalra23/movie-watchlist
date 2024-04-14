import {
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import omdbHttp from "../../utils/omdb-http";
import { BaseMovieSearchApiModel } from "../modals/movie";

const getAxiosResponseObj = (data: any): AxiosResponse => {
  const obj: AxiosResponse = {
    data,
    status: 200,
    statusText: "Success",
    headers: {} as AxiosResponseHeaders,
    config: {} as InternalAxiosRequestConfig<any>,
  };
  return obj;
};

const baseUrl = `?apikey=${import.meta.env.VITE_OMDB_MOVIE_API_KEY}`;

// API call to fetch movies
const getMoviesBySearchText = async (searchText: string) => {
  const res = await omdbHttp.get<BaseMovieSearchApiModel>(
    `${baseUrl}&s=${searchText}`
  );
  return getAxiosResponseObj(res);
};

export const MovieService = {
  getMoviesBySearchText,
};
