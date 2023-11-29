const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getAllVideogames} = require('../controllers/getAllVideogames');
const {getVideogamesById} = require('../controllers/getVideogamesById');
const {getVideogamesByName} = require('../controllers/getVideogamesByName');
const {createVideogames} = require('../controllers/createVideogames');
const {getAllGenres} = require('../controllers/getAllGenres');


const router = Router();

// Configurar los routers
router.get("/videogames", getAllVideogames);
router.get("/videogames/name", getVideogamesByName);
router.get("/videogames/:idVideogame", getVideogamesById);
//router.post("/videogames", createVideogames);
router.get("/genres", getAllGenres);

module.exports = router;
