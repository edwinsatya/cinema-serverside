const Axios = require("axios");
const {
  getVideo,
  editImageUrl,
  getReviews,
  getRecommendations,
  getSimilar,
} = require("../helpers/editDataCinema");

class MovieController {
  static async search(req, res, next) {
    try {
      const search = req.query.search;
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${search}&page=${page}`
      );

      response.data.results = await Promise.all(
        response.data.results.map(async (movie) => {
          if (!movie.backdrop_path) {
            movie.backdrop_path = `https://wallpaperaccess.com/full/2588754.jpg`;
          } else {
            movie.backdrop_path = editImageUrl(movie.backdrop_path);
          }

          if (!movie.poster_path) {
            movie.poster_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
          } else {
            movie.poster_path = editImageUrl(movie.poster_path);
          }
          movie.video = await getVideo("movie", movie.id);
          return movie;
        })
      );

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async discover(req, res, next) {
    try {
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );
      response.data.results = await Promise.all(
        response.data.results.map(async (movie) => {
          if (!movie.backdrop_path) {
            movie.backdrop_path = `https://wallpaperaccess.com/full/2588754.jpg`;
          } else {
            movie.backdrop_path = editImageUrl(movie.backdrop_path);
          }

          if (!movie.poster_path) {
            movie.poster_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
          } else {
            movie.poster_path = editImageUrl(movie.poster_path);
          }
          // movie.video = await getVideo("movie", movie.id);
          return movie;
        })
      );

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const movieId = req.params.movieId;
      const response = await Axios.get(
        `http://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}&adult=true`
      );
      if (!response.data.backdrop_path) {
        response.data.backdrop_path = `https://wallpaperaccess.com/full/2588754.jpg`;
      } else {
        response.data.backdrop_path = editImageUrl(response.data.backdrop_path);
      }

      if (!response.data.poster_path) {
        response.data.poster_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
      } else {
        response.data.poster_path = editImageUrl(response.data.poster_path);
      }

      response.data.production_companies =
        response.data.production_companies.map((company) => {
          company.logo_path = editImageUrl(company.logo_path);
          return company;
        });

      const [listVideo, listReview, listRecommendation, listSimilar] =
        await Promise.all([
          getVideo("movie", response.data.id),
          getReviews("movie", response.data.id),
          getRecommendations("movie", response.data.id),
          getSimilar("movie", response.data.id),
        ]);

      response.data.video = listVideo;
      response.data.reviews = listReview;
      response.data.recommendations = listRecommendation;
      response.data.similar = listSimilar;

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async nowPlaying(req, res, next) {
    try {
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );
      response.data.results = await Promise.all(
        response.data.results.map(async (movie) => {
          if (!movie.backdrop_path) {
            movie.backdrop_path = `https://wallpaperaccess.com/full/2588754.jpg`;
          } else {
            movie.backdrop_path = editImageUrl(movie.backdrop_path);
          }

          if (!movie.poster_path) {
            movie.poster_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
          } else {
            movie.poster_path = editImageUrl(movie.poster_path);
          }
          // movie.video = await getVideo("movie", movie.id);
          return movie;
        })
      );

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async popular(req, res, next) {
    try {
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );
      response.data.results = await Promise.all(
        response.data.results.map(async (movie) => {
          if (!movie.backdrop_path) {
            movie.backdrop_path = `https://wallpaperaccess.com/full/2588754.jpg`;
          } else {
            movie.backdrop_path = editImageUrl(movie.backdrop_path);
          }

          if (!movie.poster_path) {
            movie.poster_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
          } else {
            movie.poster_path = editImageUrl(movie.poster_path);
          }
          // movie.video = await getVideo("movie", movie.id);
          return movie;
        })
      );

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async topRated(req, res, next) {
    try {
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );
      response.data.results = await Promise.all(
        response.data.results.map(async (movie) => {
          if (!movie.backdrop_path) {
            movie.backdrop_path = `https://wallpaperaccess.com/full/2588754.jpg`;
          } else {
            movie.backdrop_path = editImageUrl(movie.backdrop_path);
          }

          if (!movie.poster_path) {
            movie.poster_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
          } else {
            movie.poster_path = editImageUrl(movie.poster_path);
          }
          // movie.video = await getVideo("movie", movie.id);
          return movie;
        })
      );

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
  static async upcoming(req, res, next) {
    try {
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );
      response.data.results = await Promise.all(
        response.data.results.map(async (movie) => {
          if (!movie.backdrop_path) {
            movie.backdrop_path = `https://wallpaperaccess.com/full/2588754.jpg`;
          } else {
            movie.backdrop_path = editImageUrl(movie.backdrop_path);
          }

          if (!movie.poster_path) {
            movie.poster_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
          } else {
            movie.poster_path = editImageUrl(movie.poster_path);
          }
          // movie.video = await getVideo("movie", movie.id);
          return movie;
        })
      );

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
