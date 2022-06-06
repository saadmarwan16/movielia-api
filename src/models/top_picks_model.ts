// To parse this data:
//
//   import { Convert, TopPicksModel } from "./file";
//
//   const topPicksModel = Convert.toTopPicksModel(json);

export interface TopPicksModel {
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
  original_language: OriginalLanguage;
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

export enum OriginalLanguage {
  En = "en",
  Es = "es",
  Fr = "fr",
  Ja = "ja",
}

// Converts JSON strings to/from your types
export class Convert {
  public static toTopPicksModel(json: string): TopPicksModel {
    return JSON.parse(json);
  }

  public static topPicksModelToJson(value: TopPicksModel): string {
    return JSON.stringify(value);
  }
}
