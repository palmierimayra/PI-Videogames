require('dotenv').config();
const axios = require("axios");
const {Videogames, Genres} = require("../db");

const getVideogamesById = async (req, res) => {
  try {
    const id = req.params.idVideogame;

    if (id.includes("-")) {
      const videogameInDB = await Videogames.findOne({ where: {id},
        include: {model: Genres, attributes: ['name'],
        through: {attributes: []}}})
      const {slug, name, released, genres, platforms, background_image, rating} = videogameInDB;

      const videogame = {
        id,
        name,
        slug,
        genres: genres.map(genre => genre.name).join(", "),
        platforms: platforms.join(", "),
        background_image,
        released,
        rating,
      };

      res.status(200).json(videogame);

    } else {
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`);
      const { slug, name, released, genres, platforms, background_image, rating } = response.data;
      const platform = platforms.map(platform => platform.platform.name);

      const videogame = {
        id,
        name,
        slug,
        genres: genres.map(genre => genre.name).join(", "),
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
