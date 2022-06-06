// To parse this data:
//
//   import { Convert, RecommendedMoviesModel } from "./file";
//
//   const recommendedMoviesModel = Convert.toRecommendedMoviesModel(json);

export interface RecommendedMoviesModel {
  page:          number;
  results:       Result[];
  total_pages:   number;
  total_results: number;
}

export interface Result {
  adult:             boolean;
  backdrop_path:     string;
  genre_ids:         number[];
  id:                number;
  media_type:        MediaType;
  title:             string;
  original_language: OriginalLanguage;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  release_date:      Date;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
}

export enum MediaType {
  Movie = "movie",
}

export enum OriginalLanguage {
  En = "en",
}

// Converts JSON strings to/from your types
export class Convert {
  public static toRecommendedMoviesModel(json: string): RecommendedMoviesModel {
      return JSON.parse(json);
  }

  public static recommendedMoviesModelToJson(value: RecommendedMoviesModel): string {
      return JSON.stringify(value);
  }
}
