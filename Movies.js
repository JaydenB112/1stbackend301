const axios = require('axios');

const cache = require('./cache');


class MovieResult {
  constructor(title, overview, releaseDate) {
    this.title = title;
    this.overview = overview;
    this.releaseDate = releaseDate;
  }
}
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
async function searchMovies(movie, city) {
  const cacheKey = `movie-${movie}-${city}`;
  const cachedData = cache[cacheKey];

  if (cachedData) {
    console.log("Cache Hit");
    return cachedData;
  }

  try {
    const movieResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: MOVIE_API_KEY,
        query: movie,
      },
    });

    const movies = movieResponse.data.results

    if (movies.length === 0) {
      throw new Error('No movies found');
    }else{
       cache.set(movie,movieResponse.data.results, 3600)

    }

    const movieResults = movies.map((movie) =>new MovieResult(movie.title, movie.overview, movie.release_date));

    cache[cacheKey]=movieResults
    console.log("Cache Miss")

    return movieResults;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = searchMovies;
