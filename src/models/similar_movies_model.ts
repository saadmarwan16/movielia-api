// To parse this data:
//
//   import { Convert, SimilarMoviesModel } from "./file";
//
//   const similarMoviesModel = Convert.toSimilarMoviesModel(json);

export interface SimilarMoviesModel {
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

export enum OriginalLanguage {
  En = "en",
  Fr = "fr",
}

// Converts JSON strings to/from your types
export class Convert {
  public static toSimilarMoviesModel(json: string): SimilarMoviesModel {
      return JSON.parse(json);
  }

  public static similarMoviesModelToJson(value: SimilarMoviesModel): string {
      return JSON.stringify(value);
  }
}
