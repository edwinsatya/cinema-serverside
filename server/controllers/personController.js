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

  static async detail(req, res, next) {
    try {
      const { personId } = req.params;

      const [detailRes, creditRes] = await Promise.all([
        Axios.get(
          `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.TMDB_KEY}`
        ),
        Axios.get(
          `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${process.env.TMDB_KEY}`
        ),
      ]);

      let response = detailRes.data;
      let arrCredits = [].concat(creditRes.data.cast);
      response.credits = arrCredits.sort((a, b) => {
        if (a.release_date === "") {
          return -1;
        } else if (
          new Date(a.release_date || a.first_air_date) >
          new Date(b.release_date || b.first_air_date)
        ) {
          return -1;
        } else if (
          new Date(a.release_date || a.first_air_date) <
          new Date(b.release_date || b.first_air_date)
        ) {
          return 1;
        } else {
          return 0;
        }
      });

      response.known_for = creditRes.data.cast
        .sort((a, b) => b.vote_count - a.vote_count)
        .slice(0, 8);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PersonController;
