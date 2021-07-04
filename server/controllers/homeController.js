const Axios = require("axios");
const { getVideo, editImageUrl } = require("../helpers/editDataCinema");

class HomeController {
  static async trending(req, res, next) {
    try {
      const mediaType = req.params.media_type;
      const timeWindow = req.params.time_window;

      const response = await Axios.get(
        `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}?api_key=${process.env.TMDB_KEY}`
      );

      response.data.results = await Promise.all(
        response.data.results.map(async (trending) => {
          if (!trending.backdrop_path) {
            trending.backdrop_path = `https://wallpaperaccess.com/full/2588754.jpg`;
          } else {
            trending.backdrop_path = editImageUrl(trending.backdrop_path);
          }
          if (trending.media_type === "person") {
            if (!trending.profile_path) {
              trending.profile_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
            } else {
              trending.profile_path = editImageUrl(trending.profile_path);
            }
          } else {
            if (!trending.poster_path) {
              trending.poster_path = `https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coming-soon%2Creopening%2C-event%2Cretail%2Csale-design-template-79543bc1062ebb6f9eb55d1bb7994d49_screen.jpg?ts=1596353421`;
            } else {
              trending.poster_path = editImageUrl(trending.poster_path);
            }
          }

          // trending.video = await getVideo(mediaType, trending.id);
          return trending;
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

module.exports = HomeController;
