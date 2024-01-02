const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Modelo Videogame', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se pudo conectar a la base de datos:', err);
    }));

  describe('Validadores', () => {
    beforeEach(() => Videogame.sync({ force: true }));

    describe('name', () => {
      it('debería lanzar un error si name es nulo', async () => {
        try {
          await Videogame.create({});
          throw new Error('Requiere un nombre válido');
        } catch (err) {
          expect(err.name).to.equal('SequelizeValidationError');
        }
      });

      it('debería funcionar cuando es un nombre válido', async () => {
        await Videogame.create({ name: 'Super Mario Bros' });
        const videogame = await Videogame.findOne({ where: { name: 'Super Mario Bros' } });
        expect(videogame.name).to.equal('Super Mario Bros');
      });
    });
  });
});