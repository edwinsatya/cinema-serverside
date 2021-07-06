const Axios = require("axios");
const {
  getVideo,
  editImageUrl,
  getReviews,
  getRecommendations,
  getSimilar,
} = require("../helpers/editDataCinema");

class TvController {
  static async search(req, res, next) {
    try {
      const search = req.query.search;
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_KEY}&query=${search}&page=${page}`
      );

      response.data.results = await Promise.all(
        response.data.results.map(async (tv) => {
          if (!tv.backdrop_path) {
            tv.backdrop_path = `https://i.ibb.co/9spxhL0/2588754.jpg`;
          } else {
            tv.backdrop_path = editImageUrl(tv.backdrop_path);
          }

          if (!tv.poster_path) {
            tv.poster_path = `https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg`;
          } else {
            tv.poster_path = editImageUrl(tv.poster_path);
          }
          tv.video = await getVideo("tv", tv.id);
          return tv;
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
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );
      response.data.results = await Promise.all(
        response.data.results.map(async (tv) => {
          if (!tv.backdrop_path) {
            tv.backdrop_path = `https://i.ibb.co/9spxhL0/2588754.jpg`;
          } else {
            tv.backdrop_path = editImageUrl(tv.backdrop_path);
          }

          if (!tv.poster_path) {
            tv.poster_path = `https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg`;
          } else {
            tv.poster_path = editImageUrl(tv.poster_path);
          }
          // tv.video = await getVideo("tv", tv.id);
          return tv;
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
      const tvId = req.params.tvId;
      const response = await Axios.get(
        `http://api.themoviedb.org/3/movie/${tvId}?api_key=${process.env.TMDB_KEY}&adult=true`
      );
      if (!response.data.backdrop_path) {
        response.data.backdrop_path = `https://i.ibb.co/9spxhL0/2588754.jpg`;
      } else {
        response.data.backdrop_path = editImageUrl(response.data.backdrop_path);
      }

      if (!response.data.poster_path) {
        response.data.poster_path = `https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg`;
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
          getVideo("tv", response.data.id),
          getReviews("tv", response.data.id),
          getRecommendations("tv", response.data.id),
          getSimilar("tv", response.data.id),
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

  static async airingToday(req, res, next) {
    try {
      const page = req.query.page;
      const response = await Axios.get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );
      response.data.results = await Promise.all(
        response.data.results.map(async (tv) => {
          if (!tv.backdrop_path) {
            tv.backdrop_path = `https://i.ibb.co/9spxhL0/2588754.jpg`;
          } else {
            tv.backdrop_path = editImageUrl(tv.backdrop_path);
          }

          if (!tv.poster_path) {
            tv.poster_path = `https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg`;
          } else {
            tv.poster_path = editImageUrl(tv.poster_path);
          }
          // tv.video = await getVideo("tv", tv.id);
          return tv;
        })
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
      response.data.results = await Promise.all(
        response.data.results.map(async (tv) => {
          if (!tv.backdrop_path) {
            tv.backdrop_path = `https://i.ibb.co/9spxhL0/2588754.jpg`;
          } else {
            tv.backdrop_path = editImageUrl(tv.backdrop_path);
          }

          if (!tv.poster_path) {
            tv.poster_path = `https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg`;
          } else {
            tv.poster_path = editImageUrl(tv.poster_path);
          }
          // tv.video = await getVideo("tv", tv.id);
          return tv;
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
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );
      response.data.results = await Promise.all(
        response.data.results.map(async (tv) => {
          if (!tv.backdrop_path) {
            tv.backdrop_path = `https://i.ibb.co/9spxhL0/2588754.jpg`;
          } else {
            tv.backdrop_path = editImageUrl(tv.backdrop_path);
          }

          if (!tv.poster_path) {
            tv.poster_path = `https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg`;
          } else {
            tv.poster_path = editImageUrl(tv.poster_path);
          }
          // tv.video = await getVideo("tv", tv.id);
          return tv;
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
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_KEY}&page=${page}&video=true`
      );
      response.data.results = await Promise.all(
        response.data.results.map(async (tv) => {
          if (!tv.backdrop_path) {
            tv.backdrop_path = `https://i.ibb.co/9spxhL0/2588754.jpg`;
          } else {
            tv.backdrop_path = editImageUrl(tv.backdrop_path);
          }

          if (!tv.poster_path) {
            tv.poster_path = `https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg`;
          } else {
            tv.poster_path = editImageUrl(tv.poster_path);
          }
          // tv.video = await getVideo("tv", tv.id);
          return tv;
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

module.exports = TvController;
