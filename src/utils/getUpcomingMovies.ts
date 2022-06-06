import axios from "axios";

const getUpcomingMovies = () => {
  return axios.get(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=8d044cad46ad7642448ad030821c995d&language=en-US&page=1"
  );
};

export default getUpcomingMovies;
