require('dotenv').config();
const axios = require("axios");

const getAllVideogames = async (req, res) => {
  try {
    const URL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=1`;
    
    const response = await axios(URL);
    const videogames = response.data.results;

    const videogameArray = await Promise.all(
      videogames.map(async (videogame) => {

        const { slug, name, released, platforms, background_image, rating, genres } = videogame;
        const platform = platforms.map(platform => platform.platform.name);
        const genre = genres.map(genre => genre.name);

        return {
          name,
          slug,
          platforms: platform,
          background_image,
          released,
          rating,
          genres: genre.join(", ")
        };
      })
    );

    return res.status(200).json(videogameArray);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getAllVideogames,
};
