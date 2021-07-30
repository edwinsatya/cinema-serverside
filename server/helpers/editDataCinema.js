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

async function getSeasonVideo(id, seasonNumber, episodeNumber) {
  try {
    let result = null;
    if (!episodeNumber) {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/videos?api_key=${process.env.TMDB_KEY}`
      );
      result = response.data.results;
    } else {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/videos?api_key=${process.env.TMDB_KEY}`
      );
      result = response.data.results;
    }

    const results = result.map((video) => {
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

async function getImages(type, id) {
  try {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${process.env.TMDB_KEY}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

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

async function getCredits(type, id) {
  try {
    const response = await Axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.TMDB_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = {
  getVideo,
  getImages,
  getReviews,
  getRecommendations,
  getSimilar,
  getSeasonVideo,
  getCredits,
};
