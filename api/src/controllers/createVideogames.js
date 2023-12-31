const {Videogames, Genres} = require('../db');

const createVideogames = async (req, res) => {
      try {
        const { id, slug, name, released, platforms, genres, background_image, rating } = req.body;

        const videogame = await Videogames.create({ 
          id,
          slug, 
          name, 
          released, 
          platforms, 
          genres,
          background_image: background_image ? background_image: "https://www.mikeburger.com/td-simpsons-dog.jpg", 
          rating
        });
    
        let dbGenres = await Genres.findAll({
          where: {
              name: genres
          }
      });
      if (dbGenres && dbGenres.length > 0) {
          await videogame.addGenres(dbGenres);
      } else {
          throw Error('Por favor, intenta con otro género');
      }
    
        res.status(200).json(videogame);

      } catch (error) {
          res.status(500).json({ message: error.message });
        }
};

module.exports = {
    createVideogames,
};
