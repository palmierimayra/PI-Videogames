require('dotenv').config();
const axios = require("axios");
const {Genres} = require('../db');
const { log } = require('console');

const getAllGenres = async (req, res) => {
  try {
    const URL = `https://api.rawg.io/api/genres?key=${process.env.API_KEY}`;
    const response = await axios(URL);
    const videogames = response.data.results;

    const genresArray = await Promise.all(
      videogames.map(async (videogame) => {

        const { id, name } = videogame;

        return {
            id,
          name,
        };
      })
    );

      const GenresinDB = await Genres.count();
      if(GenresinDB===0) {
        const genres = await Genres.bulkCreate(genresArray);
        res.status(200).json(genres);
      } else {
        const allGenres = await Genres.findAll()
        res.status(200).json(allGenres);
      }
  
    } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
module.exports = {
    getAllGenres,
};
