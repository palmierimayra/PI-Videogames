require('dotenv').config();
const axios = require("axios");
const {Videogames} = require("../db");

const getVideogamesById = async (req, res) => {
  try {
    const id = req.params.idVideogame;
    const videogameInDB = await Videogames.findOne({ where: { id: id } });

    if (videogameInDB) {
      res.status(200).json(videogameInDB);
    } else {
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`);
      const { slug, name, released, genres, platforms, background_image, rating } = response.data;
      const platform = platforms.map(platform => platform.platform.name);
      const genre = genres.map(genre => genre.name);
    

      const videogame = {
        id,
        name,
        slug,
        genre: genre.join(", "),
        platforms: platform.join(", "),
        background_image,
        released,
        rating,
      };

  res.status(200).json(videogame);
    }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getVideogamesById,
};
