const Axios = require("axios");

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
            movie.backdrop_path = MovieController.editImageUrl(
              movie.backdrop_path
            );
          }

          if (!movie.poster_path) {
            movie.poster_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
          } else {
            movie.poster_path = MovieController.editImageUrl(movie.poster_path);
          }
          movie.video = await MovieController.getVideo(movie.id);
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
            movie.backdrop_path = MovieController.editImageUrl(
              movie.backdrop_path
            );
          }

          if (!movie.poster_path) {
            movie.poster_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
          } else {
            movie.poster_path = MovieController.editImageUrl(movie.poster_path);
          }
          movie.video = await MovieController.getVideo(movie.id);
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

  static editImageUrl(img) {
    return `https://image.tmdb.org/t/p/original${img}`;
  }

  static async getVideo(movieId) {
    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_KEY}`
      );
      const result = response.data.results.map((movie) => {
        return {
          url: `https://www.youtube.com/watch?v=${movie.key}`,
          name: movie.name,
          site: movie.site,
          type: movie.type,
        };
      });
      return result;
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
