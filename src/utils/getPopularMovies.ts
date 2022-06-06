import axios from "axios";
import { Convert } from "../models/popular_movies_model";

const getPopularMovies = async () => {
  return axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=8d044cad46ad7642448ad030821c995d&language=en-US&page=1"
  );
};

export default getPopularMovies;
