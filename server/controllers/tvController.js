const Axios = require("axios");
const {
  getVideo,
  getImages,
  getSeasonVideo,
  getReviews,
  getRecommendations,
  getSimilar,
  getCredits,
} = require("../helpers/editDataCinema");

class TvController {
  static async search(req, res, next) {
    try {
      const search = req.query.search;
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_KEY}&query=${search}&page=${page}`
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
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
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
      const tvId = req.params.tvId;
      const response = await Axios.get(
        `http://api.themoviedb.org/3/tv/${tvId}?api_key=${process.env.TMDB_KEY}`
      );

      const [
        listVideo,
        listReview,
        listRecommendation,
        listSimilar,
        listCredit,
        listImage,
      ] = await Promise.all([
        getVideo("tv", response.data.id),
        getReviews("tv", response.data.id),
        getRecommendations("tv", response.data.id),
        getSimilar("tv", response.data.id),
        getCredits("tv", response.data.id),
        getImages("tv", response.data.id),
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

  static async detailSeason(req, res, next) {
    try {
      const { tvId, seasonNumber } = req.params;
      const response = await Axios.get(
        `http://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${process.env.TMDB_KEY}`
      );

      response.data.video = await getSeasonVideo(tvId, seasonNumber);

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detailEpisode(req, res, next) {
    try {
      const { tvId, seasonNumber, episodeNumber } = req.params;
      const response = await Axios.get(
        `http://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${process.env.TMDB_KEY}`
      );

      response.data.video = await getSeasonVideo(
        tvId,
        seasonNumber,
        episodeNumber
      );

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async airingToday(req, res, next) {
    try {
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async onAir(req, res, next) {
    try {
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
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
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
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
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TvController;
