// To parse this data:
//
//   import { Convert, TopRatedMoviesModel } from "./file";
//
//   const topRatedMoviesModel = Convert.toTopRatedMoviesModel(json);

export interface TopRatedMoviesModel {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toTopRatedMoviesModel(json: string): TopRatedMoviesModel {
    return JSON.parse(json);
  }

  public static topRatedMoviesModelToJson(value: TopRatedMoviesModel): string {
    return JSON.stringify(value);
  }
}
