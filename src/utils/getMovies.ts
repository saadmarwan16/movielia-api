import axios from "axios";
import transformedMovieData from "./transformedMovieData";

const getMovies = async (
  url: string,
  converter: Function,
  imagePrefix: string
) => {
  const { data } = await axios.get(url);
  const convertedMovies = converter(JSON.stringify(data));

  const movies = transformedMovieData(convertedMovies.results, imagePrefix);

  return {
    hasMore: convertedMovies.page < convertedMovies.total_pages,
    movies,
  };
};

export default getMovies;
