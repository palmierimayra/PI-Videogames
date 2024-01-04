const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogames, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  slug: 'super-mario-bros',
  platforms: ['Platform1', 'Platform2'],
  background_image: 'url_de_la_imagen',
  released: '2022-01-01',
  rating: 4.5
};

describe('Validación de rutas', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogames.sync({ force: true })
    .then(() => Videogames.create(videogame)));
   
    describe('GET /videogames', () => {
      it('Debe retornar la información de 100 videojuegos', (done) => {
        agent.get('/videogames')
          .timeout(10000)  // Aumenta el tiempo de espera a 10 segundos
          .expect(200)
          .expect((res) => {
            const videogames = res.body;
            expect(videogames).to.be.an('array').that.is.not.empty;
            Videogames.findAll().then(dbVideogames => {
              expect(videogames.length).to.equal(dbVideogames.length);
              done();
            });
          })
          .end(done);
      }).timeout(11000);
    });

    describe('GET /genres', () => {
      it('Debe retornar todos los géneros', (done) => {
        agent.get('/genres')
          .timeout(10000)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
           
            const genres = res.body;
            expect(genres).to.be.an('array').that.is.not.empty;
            done();
          });
      }).timeout(11000);
    });
   

});
