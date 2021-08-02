const Axios = require("axios");
const {
  getVideo,
  getImages,
  getReviews,
  getRecommendations,
  getSimilar,
  getCredits,
} = require("../helpers/editDataCinema");

class MovieController {
  static async search(req, res, next) {
    try {
      const search = req.query.search;
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${search}&page=${page}`
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
        `http://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`
      );

      const [
        listVideo,
        listReview,
        listRecommendation,
        listSimilar,
        listCredit,
        listImage,
      ] = await Promise.all([
        getVideo("movie", response.data.id),
        getReviews("movie", response.data.id),
        getRecommendations("movie", response.data.id),
        getSimilar("movie", response.data.id),
        getCredits("movie", response.data.id),
        getImages("movie", response.data.id),
      ]);

      response.data.video = listVideo;
      response.data.reviews = listReview;
      response.data.recommendations = listRecommendation;
      response.data.similar = listSimilar;
      response.data.credits = listCredit;
      response.data.images = listImage;

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

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
