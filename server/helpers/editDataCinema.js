const Axios = require("axios");

async function getVideo(type, id) {
  try {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.TMDB_KEY}`
    );
    const results = response.data.results.map((video) => {
      return {
        key: video.key,
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

// function editImageUrl(img) {
//   return `https://image.tmdb.org/t/p/original${img}`;
// movie.backdrop_path = `https://i.ibb.co/9spxhL0/2588754.jpg`;
// tv.poster_path = `https://i.ibb.co/6HwNvXv/coming-soon-reopening-event-retail-sale-design-template-79543bc1062ebb6f9eb55d1bb7994d49-screen.jpg`;
// }

async function getReviews(type, id) {
  try {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${process.env.TMDB_KEY}`
    );

    return response.data.results;
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

    return response.data.results;
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

    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = {
  getVideo,
  getReviews,
  getRecommendations,
  getSimilar,
};
