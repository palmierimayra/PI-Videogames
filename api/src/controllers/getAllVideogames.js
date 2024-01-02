require('dotenv').config();
const axios = require("axios");
const {Videogames, Genres} = require('../db');

const getAllVideogames = async (req, res) => {
  let allGamesAPI = [];
  let allGamesDB = [];
  let URL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}`;

  try {
    while (allGamesAPI.length < 100 && URL) {
      let response = await axios.get(URL);
      let { results, next } = response.data;

      allGamesAPI = [...allGamesAPI, ...results];
      URL = next;
    }

    allGamesAPI.forEach(async (videogame, index) => {
      const { id, slug, name, released, platforms, background_image, rating, genres } = videogame;
      const platform = platforms.map(platform => platform.platform.name);
      const genre = genres.map(genre => genre.name);

      allGamesAPI[index] = {
        id, 
        name,
        slug,
        platforms: platform,
        background_image,
        released,
        rating,
        genres: genre.join(", "),
        source: 'API',
      };
    });

      const dbVideogames = await Videogames.findAll({ include: [Genres] });   

      let allGamesDB = dbVideogames.map((videogame) => {
          return{
              id: videogame.id,
              name: videogame.name,
              slug: videogame.slug? videogame.slug : 'sin descripcion',
              platforms: videogame.platforms.join,
              background_image: videogame.background_image,
              genres: videogame.genres.map(genre => genre.name).join(", "),
              released: videogame.released,
              rating: videogame.rating,
              source: 'DataBase',
          };    
      });    

    let allGamesResults = [...allGamesAPI, ...allGamesDB];

    return res.status(200).json(allGamesResults);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllVideogames,
};
