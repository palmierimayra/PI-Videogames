require('dotenv').config();
const axios = require("axios");

const getAllVideogames = async (req, res) => {
  let allGames = [];
  let URL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}`;

  try {
    while (allGames.length < 100 && URL) {
      let response = await axios.get(URL);
      let { results, next } = response.data;

      allGames = [...allGames, ...results];
      URL = next;
    }

    allGames.forEach(async (videogame, index) => {
      const { id, slug, name, released, platforms, background_image, rating, genres } = videogame;
      const platform = platforms.map(platform => platform.platform.name);
      const genre = genres.map(genre => genre.name);

      allGames[index] = {
        id, 
        name,
        slug,
        platforms: platform,
        background_image,
        released,
        rating,
        genres: genre.join(", ")
      };
    });

    return res.status(200).json(allGames);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllVideogames,
};
