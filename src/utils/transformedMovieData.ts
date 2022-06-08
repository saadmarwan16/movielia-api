import dayjs from "dayjs";
import { ITransformedResults } from "../interfaces";
import { TGenreIds } from "../types";
import getGenre from "./getGenreString";

const transformedMovieData = (data: any[], imageUrlPrefix: string) => {
  const transformedData: ITransformedResults[] = [];

  data.forEach((singleData) => {
    transformedData.push({
      id: singleData.id,
      title: singleData.title,
      rating: singleData.vote_average.toFixed(1),
      releaseYear: dayjs(singleData.release_date).year(),
      image: !!singleData.poster_path
        ? `${imageUrlPrefix}${singleData.poster_path}`
        : null,
      secondImage: !!singleData.backdrop_path
        ? `${imageUrlPrefix}${singleData.backdrop_path}`
        : null,
      genre:
        singleData.genre_ids.length > 0
          ? getGenre(singleData.genre_ids[0] as TGenreIds)
          : "N / A",
    });
  });

  return transformedData;
};

export default transformedMovieData;
