// To parse this data:
//
//   import { Convert, TrendingMoviesModel } from "./file";
//
//   const trendingMoviesModel = Convert.toTrendingMoviesModel(json);

export interface TrendingMoviesModel {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  original_title: string;
  poster_path: string;
  video: boolean;
  vote_average: number;
  id: number;
  overview: string;
  release_date: Date;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  vote_count: number;
  original_language: OriginalLanguage;
  popularity: number;
  media_type: MediaType;
}

export enum MediaType {
  Movie = "movie",
}

export enum OriginalLanguage {
  En = "en",
  Hi = "hi",
  It = "it",
  Pl = "pl",
}

// Converts JSON strings to/from your types
export class Convert {
  public static toTrendingMoviesModel(json: string): TrendingMoviesModel {
    return JSON.parse(json);
  }

  public static trendingMoviesModelToJson(value: TrendingMoviesModel): string {
    return JSON.stringify(value);
  }
}
