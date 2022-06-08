export interface ITransformedResults {
  id: number;
  title: string;
  rating: string;
  releaseYear: number;
  image: string | null;
  secondImage: string | null;
  genre: string;
}

export interface ITopPicks {
  id: number;
  posterImage: string | null;
  backdropImage: string | null;
  name: string;
  date: string;
}

export interface IMovieCast {
  profileImage: string;
  name: string;
  gender: "Male" | "Female";
}
