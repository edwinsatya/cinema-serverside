const Axios = require("axios");

class HomeController {
  static async trending(req, res, next) {
    try {
      const mediaType = req.params.media_type;
      const timeWindow = req.params.time_window;

      const response = await Axios.get(
        `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}?api_key=${process.env.TMDB_KEY}`
      );

      res.status(200).json({
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HomeController;
