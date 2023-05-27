

const axios = require('axios');



class MovieResult {
    constructor(title, overview, releaseDate) {
        this.title = title;
        this.overview = overview;
        this.releaseDate = releaseDate;
    }
}
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
async function searchMovies(movie, city) {
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
    }

    const movieResults = movies.map((movie) =>
      new MovieResult(movie.title, movie.overview, movie.release_date)
    );

    return movieResults;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = searchMovies;
