const {Videogames, Genres} = require('../db');

const createVideogames = async (req, res) => {
      try {
        const { slug, name, released, platforms, genres, background_image, rating } = req.body;
    
        const videogame = await Videogames.create({ slug, name, released, platforms, background_image, rating });
    
        if (genres && genres.length>0) {
          const genresDB = await Genres.findAll({ where: { name: genres } });
          await videogame.setGenres(genresDB);
        }

        res.status(200).json(videogame);
      } catch (error) {
          res.status(500).json({ message: error.message });
        }
};

module.exports = {
    createVideogames,
};
