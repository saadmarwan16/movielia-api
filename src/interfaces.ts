export interface ITransformedResults {
  id: number;
  title: string;
  rating: string;
  releaseYear: number;
  image: string;
  genre: string;
}

export interface ITopPicks {
  id: number;
  posterImage: string;
  backdropImage: string;
  name: string;
  date: string;
}

export interface IMovieCast {
  profileImage: string;
  name: string;
  gender: "Male" | "Female";
}
