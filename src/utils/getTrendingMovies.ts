import axios from "axios";

const getTrendingMovies = () => {
  return axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=8d044cad46ad7642448ad030821c995d"
  );
};

export default getTrendingMovies;
