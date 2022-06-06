// To parse this data:
//
//   import { Convert, MovieDetailsModel } from "./file";
//
//   const movieDetailsModel = Convert.toMovieDetailsModel(json);

export interface MovieDetailsModel {
  adult:                 boolean;
  backdrop_path:         string;
  belongs_to_collection: BelongsToCollection;
  budget:                number;
  genres:                Genre[];
  homepage:              string;
  id:                    number;
  imdb_id:               string;
  original_language:     OriginalLanguage;
  original_title:        string;
  overview:              string;
  popularity:            number;
  poster_path:           string;
  production_companies:  ProductionCompany[];
  production_countries:  ProductionCountry[];
  release_date:          Date;
  revenue:               number;
  runtime:               number;
  spoken_languages:      SpokenLanguage[];
  status:                string;
  tagline:               string;
  title:                 string;
  video:                 boolean;
  vote_average:          number;
  vote_count:            number;
  videos:                Videos;
}

export interface BelongsToCollection {
  id:            number;
  name:          string;
  poster_path:   string;
  backdrop_path: string;
}

export interface Genre {
  id:   number;
  name: string;
}

export enum OriginalLanguage {
  En = "en",
}

export interface ProductionCompany {
  id:             number;
  logo_path:      string;
  name:           string;
  origin_country: OriginCountry;
}

export enum OriginCountry {
  Us = "US",
}

export interface ProductionCountry {
  iso_3166_1: OriginCountry;
  name:       string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1:    string;
  name:         string;
}

export interface Videos {
  results: Result[];
}

export interface Result {
  iso_639_1:    OriginalLanguage;
  iso_3166_1:   OriginCountry;
  name:         string;
  key:          string;
  site:         Site;
  size:         number;
  type:         string;
  official:     boolean;
  published_at: Date;
  id:           string;
}

export enum Site {
  YouTube = "YouTube",
}

// Converts JSON strings to/from your types
export class Convert {
  public static toMovieDetailsModel(json: string): MovieDetailsModel {
      return JSON.parse(json);
  }

  public static movieDetailsModelToJson(value: MovieDetailsModel): string {
      return JSON.stringify(value);
  }
}
