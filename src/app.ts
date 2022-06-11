import axios from "axios";
import express, { Application, Request, Response } from "express";
import { IMovieCast, ITopPicks } from "./interfaces";
import { Convert as MovieCreditsConvert } from "./models/movie_credits_model";
import { Convert as MovieDetailsConvert } from "./models/movie_details_model";
import { Convert as NowPlayingMoviesConvert } from "./models/now_playing_movies_model";
import { Convert as PopularMoviesConvert } from "./models/popular_movies_model";
import { Convert as TopRatedMoviesConvert } from "./models/top_rated_movies_model";
import { Convert as TrendingMoviesConvert } from "./models/trending_movies_model";
import { Convert as UpcomingMoviesConvert } from "./models/upcoming_movies_model";
import getMoviesPromise from "./utils/getMoviesPromise";
import dotenv from "dotenv";
import dayjs from "dayjs";
import transformedMovieData from "./utils/transformedMovieData";
import { Convert as RecommendedMoviesConvert } from "./models/recommended_movies_model";
import { Convert as SimilarMoviesConvert } from "./models/similar_movies_model";
import getMovies from "./utils/getMovies";
import { Convert as SearchMoviesConvert } from "./models/search_movies_model";
import { Convert as TopPicksConvert } from "./models/top_picks_model";
import { Convert as SingleGenreConvert } from "./models/single_genre_model";
import getImage from "./utils/getImage";

const uniqueRandomRange = require("unique-random-range");

const app: Application = express();

dotenv.config();
const port = process.env.PORT || 8080;
const IMAGE_URL_PREFIX = "https://image.tmdb.org/t/p/original";
const API_KEY = process.env.API_KEY;

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

app.get("/", async (_: Request, res: Response) => {
  axios
    .all([
      getMoviesPromise(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      ),
      getMoviesPromise(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      ),
      getMoviesPromise(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
      ),
      getMoviesPromise(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      ),
      getMoviesPromise(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      ),
      getMoviesPromise(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      ),
      getMoviesPromise(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_networks=213&vote_average.gte=8&sort_by=popularity.desc`
      ),
    ])
    .then(
      axios.spread((...responses) => {
        const { data: popularMovies } = responses[0];
        const { data: topRatedMovies } = responses[1];
        const { data: trendingMovies } = responses[2];
        const { data: upcomingMovies } = responses[3];
        const { data: nowPlayingMovies } = responses[4];
        const { data: genres } = responses[5];
        const { data: topMoviePicks } = responses[6];

        const transformedPopularMovies = transformedMovieData(
          PopularMoviesConvert.toPopularMoviesModel(
            JSON.stringify(popularMovies)
          ).results,
          IMAGE_URL_PREFIX
        );
        const transformedTopRatedMovies = transformedMovieData(
          TopRatedMoviesConvert.toTopRatedMoviesModel(
            JSON.stringify(topRatedMovies)
          ).results,
          IMAGE_URL_PREFIX
        );
        const transformedTrendingMovies = transformedMovieData(
          TrendingMoviesConvert.toTrendingMoviesModel(
            JSON.stringify(trendingMovies)
          ).results,
          IMAGE_URL_PREFIX
        );
        const transformedUpcomingMovies = transformedMovieData(
          UpcomingMoviesConvert.toUpcomingMoviesModel(
            JSON.stringify(upcomingMovies)
          ).results,
          IMAGE_URL_PREFIX
        );
        const transformedNowPlayingMovies = transformedMovieData(
          NowPlayingMoviesConvert.toNowPlayingMoviesModel(
            JSON.stringify(nowPlayingMovies)
          ).results,
          IMAGE_URL_PREFIX
        );

        const topPicksResults = TopPicksConvert.toTopPicksModel(
          JSON.stringify(topMoviePicks)
        ).results;
        let transformedTopPicks: ITopPicks[] = [];
        const indices = uniqueRandomRange(0, topPicksResults.length - 1);

        [indices(), indices(), indices()].map((index) => {
          transformedTopPicks.push({
            id: topPicksResults[index].id,
            name: topPicksResults[index].title,
            image: getImage(
              IMAGE_URL_PREFIX,
              topPicksResults[index].poster_path,
              topPicksResults[index].backdrop_path
            ),
            date: `On ${dayjs(topPicksResults[index].release_date).format(
              "MMM DD, YYYY"
            )}`,
          });
        });

        res.status(200).json({
          topPicks: transformedTopPicks,
          genres: genres.genres,
          popularMovies: transformedPopularMovies,
          topRatedMovies: transformedTopRatedMovies,
          trendingMovies: transformedTrendingMovies,
          upcomingMovies: transformedUpcomingMovies,
          nowPlayingMovies: transformedNowPlayingMovies,
        });
      })
    );
});

app.get("/genres", async (req: Request, res: Response) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );

  res.status(200).json(data);
});

app.get("/movie-details/:id", async (req: Request, res: Response) => {
  axios
    .all([
      axios.get(
        `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${API_KEY}&language=en-US`
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${req.params.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${req.params.id}/similar?api_key=${API_KEY}&language=en-US&page=1`
      ),
    ])
    .then(
      axios.spread((...responses) => {
        const { data: movieDetails } = responses[0];
        const { data: movieCredits } = responses[1];
        const { data: recommendedMovies } = responses[2];
        const { data: similarMovies } = responses[3];

        const movieDetailsModel = MovieDetailsConvert.toMovieDetailsModel(
          JSON.stringify(movieDetails)
        );
        const videoIndex = movieDetailsModel.videos.results.findIndex(
          (video) =>
            video.official === true &&
            video.site === "YouTube" &&
            video.type === "Trailer"
        );
        const movieCreditsModel = MovieCreditsConvert.toMovieCreditsModel(
          JSON.stringify(movieCredits)
        );
        const transformedRecommendedMovies = transformedMovieData(
          RecommendedMoviesConvert.toRecommendedMoviesModel(
            JSON.stringify(recommendedMovies)
          ).results,
          IMAGE_URL_PREFIX
        );
        const transformedSimilarMovies = transformedMovieData(
          SimilarMoviesConvert.toSimilarMoviesModel(
            JSON.stringify(similarMovies)
          ).results,
          IMAGE_URL_PREFIX
        );

        let movieGenres: string[] = [];
        movieDetailsModel.genres.forEach((genre) => {
          movieGenres.push(genre.name);
        });

        let transfromedMovieCast: IMovieCast[] = [];
        movieCreditsModel.cast.forEach((actor) => {
          transfromedMovieCast.push({
            image: getImage(IMAGE_URL_PREFIX, actor.profile_path, null),
            gender: actor.gender == 1 ? "Female" : "Male",
            name: actor.name,
          });
        });

        res.status(200).json({
          title: movieDetailsModel.title,
          posterImage: `${IMAGE_URL_PREFIX}${movieDetailsModel.poster_path}`,
          backdropImage: `${IMAGE_URL_PREFIX}${movieDetailsModel.backdrop_path}`,
          releaseYear: dayjs(movieDetailsModel.release_date).year(),
          runtime: movieDetailsModel.runtime,
          rating: movieDetailsModel.vote_average,
          genres: movieGenres,
          homepage: movieDetailsModel.homepage,
          overview: movieDetailsModel.overview,
          videoKey:
            videoIndex === -1
              ? null
              : movieDetailsModel.videos.results[videoIndex].key,
          cast: transfromedMovieCast,
          recommendedMovies: transformedRecommendedMovies,
          similarMovies: transformedSimilarMovies,
        });
      })
    );
});

app.get("/now-playing/:pageNumber", async (req: Request, res: Response) => {
  const results = await getMovies(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${req.params.pageNumber}`,
    NowPlayingMoviesConvert.toNowPlayingMoviesModel,
    IMAGE_URL_PREFIX
  );

  res.status(200).json(results);
});

app.get("/popular/:pageNumber", async (req: Request, res: Response) => {
  const results = await getMovies(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${req.params.pageNumber}`,
    PopularMoviesConvert.toPopularMoviesModel,
    IMAGE_URL_PREFIX
  );

  res.status(200).json(results);
});

app.get("/upcoming/:pageNumber", async (req: Request, res: Response) => {
  const results = await getMovies(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${req.params.pageNumber}`,
    UpcomingMoviesConvert.toUpcomingMoviesModel,
    IMAGE_URL_PREFIX
  );

  res.status(200).json(results);
});

app.get("/top-rated/:pageNumber", async (req: Request, res: Response) => {
  const results = await getMovies(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${req.params.pageNumber}`,
    TopRatedMoviesConvert.toTopRatedMoviesModel,
    IMAGE_URL_PREFIX
  );

  res.status(200).json(results);
});

app.get("/trending/:pageNumber", async (req: Request, res: Response) => {
  const results = await getMovies(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${req.params.pageNumber}`,
    TrendingMoviesConvert.toTrendingMoviesModel,
    IMAGE_URL_PREFIX
  );

  res.status(200).json(results);
});

app.get("/similar/:id/:pageNumber", async (req: Request, res: Response) => {
  const results = await getMovies(
    `https://api.themoviedb.org/3/movie/${req.params.id}/similar?api_key=${API_KEY}&language=en-US&page=${req.params.pageNumber}`,
    SimilarMoviesConvert.toSimilarMoviesModel,
    IMAGE_URL_PREFIX
  );

  res.status(200).json(results);
});

app.get(
  "/recommendations/:id/:pageNumber",
  async (req: Request, res: Response) => {
    const results = await getMovies(
      `https://api.themoviedb.org/3/movie/${req.params.id}/recommendations?api_key=${API_KEY}&language=en-US&page=${req.params.pageNumber}`,
      RecommendedMoviesConvert.toRecommendedMoviesModel,
      IMAGE_URL_PREFIX
    );

    res.status(200).json(results);
  }
);

app.get(
  "/search/:queryString/:pageNumber",
  async (req: Request, res: Response) => {
    const results = await getMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${req.params.queryString}&page=${req.params.pageNumber}`,
      SearchMoviesConvert.toSearchMoviesModel,
      IMAGE_URL_PREFIX
    );

    res.status(200).json(results);
  }
);

app.get(
  "/discover-genres/:id/:pageNumber",
  async (req: Request, res: Response) => {
    const results = await getMovies(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${req.params.pageNumber}&with_genres=${req.params.id}`,
      SingleGenreConvert.toSingleGenreModel,
      IMAGE_URL_PREFIX
    );

    res.status(200).json(results);
  }
);
