export interface ITransformedResults {
  id: number;
  title: string;
  rating: string;
  year: number;
  image: string;
  popularity: string;
  genre: string;
}

export interface ITopPicks {
  id: number;
  image: string;
  name: string;
  date: string;
}

export interface IMovieCast {
  image: string;
  name: string;
  gender: "Male" | "Female";
}
