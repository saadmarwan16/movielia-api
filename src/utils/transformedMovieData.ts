import dayjs from "dayjs";
import { ITransformedResults } from "../interfaces";
import { TGenreIds } from "../types";
import getGenre from "./getGenreString";
import getImage from "./getImage";

const transformedMovieData = (data: any[], imageUrlPrefix: string) => {
  const transformedData: ITransformedResults[] = [];

  data.forEach((singleData) => {
    transformedData.push({
      id: singleData.id,
      title: singleData.title,
      rating: singleData.vote_average.toFixed(1),
      year: dayjs(singleData.release_date).year(),
      image: getImage(imageUrlPrefix, singleData.poster_path, singleData.backdrop_path),
      genre:
        singleData.genre_ids.length > 0
          ? getGenre(singleData.genre_ids[0] as TGenreIds)
          : "N / A",
    });
  });

  return transformedData;
};

export default transformedMovieData;
