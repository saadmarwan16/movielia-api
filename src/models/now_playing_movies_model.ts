// To parse this data:
//
//   import { Convert, NowPlayingMoviesModel } from "./file";
//
//   const nowPlayingMoviesModel = Convert.toNowPlayingMoviesModel(json);

export interface NowPlayingMoviesModel {
  dates:         Dates;
  page:          number;
  results:       Result[];
  total_pages:   number;
  total_results: number;
}

export interface Dates {
  maximum: Date;
  minimum: Date;
}

export interface Result {
  adult:             boolean;
  backdrop_path:     string;
  genre_ids:         number[];
  id:                number;
  original_language: OriginalLanguage;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  release_date:      Date;
  title:             string;
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
  public static toNowPlayingMoviesModel(json: string): NowPlayingMoviesModel {
      return JSON.parse(json);
  }

  public static nowPlayingMoviesModelToJson(value: NowPlayingMoviesModel): string {
      return JSON.stringify(value);
  }
}
