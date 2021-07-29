const Axios = require("axios");

class PersonController {
  static async popular(req, res, next) {
    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}`
      );

      res.status(200).json({
        data: response.data.results,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PersonController;
