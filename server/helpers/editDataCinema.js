const Axios = require("axios");

async function getVideo(type, id) {
  try {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.TMDB_KEY}`
    );
    const results = response.data.results.map((video) => {
      return {
        url: `https://www.youtube.com/watch?v=${video.key}`,
        name: video.name,
        site: video.site,
        type: video.type,
      };
    });
    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function editImageUrl(img) {
  return `https://image.tmdb.org/t/p/original${img}`;
}

async function getReviews(type, id) {
  try {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${process.env.TMDB_KEY}`
    );
    const results = response.data.results.map((review) => {
      review.author_details.avatar_path = editImageUrl(
        review.author_details.avatar_path
      );
      return review;
    });
    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getRecommendations(type, id) {
  try {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.TMDB_KEY}`
    );
    const results = await Promise.all(
      response.data.results.map(async (recommendation) => {
        if (!recommendation.backdrop_path) {
          recommendation.backdrop_path = `https://i.ibb.co/9spxhL0/2588754.jpg`;
        } else {
          recommendation.backdrop_path = editImageUrl(
            recommendation.backdrop_path
          );
        }

        if (!recommendation.poster_path) {
          recommendation.poster_path = `https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg`;
        } else {
          recommendation.poster_path = editImageUrl(recommendation.poster_path);
        }

        recommendation.video = await getVideo(type, recommendation.id);
        return recommendation;
      })
    );
    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getSimilar(type, id) {
  try {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${process.env.TMDB_KEY}`
    );
    const results = await Promise.all(
      response.data.results.map(async (similar) => {
        if (!similar.backdrop_path) {
          similar.backdrop_path = `https://i.ibb.co/9spxhL0/2588754.jpg`;
        } else {
          similar.backdrop_path = editImageUrl(similar.backdrop_path);
        }

        if (!similar.poster_path) {
          similar.poster_path = `https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg`;
        } else {
          similar.poster_path = editImageUrl(similar.poster_path);
        }

        similar.video = await getVideo(type, similar.id);
        return similar;
      })
    );
    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = {
  getVideo,
  editImageUrl,
  getReviews,
  getRecommendations,
  getSimilar,
};
