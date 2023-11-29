require('dotenv').config();
const axios = require("axios");
const {Videogames} = require("../db");

const getVideogamesByName = async (req, res) => {
  try {
    const {name} = req.query;
    const videogameInDB = await Videogames.findOne({ where: { name: name } });

    if (videogameInDB) {
      res.status(200).json(videogameInDB);
    } else {
      const URL = `https://api.rawg.io/api/games?search=${name.toLowerCase()}&key=${process.env.API_KEY}`;
      const response = await axios(URL);
      const videogames = response.data.results;
  
      const videogameArray = await Promise.all(
        videogames.map(async (videogame) => {
  
          const { slug, name, released, platforms, background_image, rating } = videogame;
          const platform = platforms.map(platform => platform.platform.name);
  
          return {
            name,
            slug,
            platforms: platform,
            background_image,
            released,
            rating,
          };
        })
      );
  
  res.status(200).json(videogameArray);
    }
  } catch (error) {
    if (error.response.status === 404) {
      res.status(404).send("Videogame not found");
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
    getVideogamesByName,
};
