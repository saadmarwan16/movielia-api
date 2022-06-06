// To parse this data:
//
//   import { Convert, SearchMoviesModel } from "./file";
//
//   const searchMoviesModel = Convert.toSearchMoviesModel(json);

export interface SearchMoviesModel {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toSearchMoviesModel(json: string): SearchMoviesModel {
    return JSON.parse(json);
  }

  public static searchMoviesModelToJson(value: SearchMoviesModel): string {
    return JSON.stringify(value);
  }
}
