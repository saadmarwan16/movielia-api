import axios from "axios";

const getMoviesPromise = (url: string) => {
  return axios.get(url);
};

export default getMoviesPromise;
