const {Videogames, Genres} = require('../db');

const createVideogames = async (req, res) => {
        const { id, slug, name, released, platforms, genres, background_image, rating } = req.body;

        const videogame = await Videogames.create({ 
          id,
          slug, 
          name, 
          released, 
          platforms, 
          background_image: background_image ? background_image: "https://www.mikeburger.com/td-simpsons-dog.jpg", 
          rating
        });
    
        genres.forEach(async (G) => {
          let genresGame = await Genres.findOne({ where: { name: G } })
          await videogame.addGenre(genresGame)
      })
        res.send('Videogame created successfully!')
    }

module.exports = {
    createVideogames,
};
