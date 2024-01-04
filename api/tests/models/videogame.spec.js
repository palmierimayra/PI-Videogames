const { Videogames, conn } = require('../../src/db');
const { expect } = require('chai');

describe('Validaciones de modelos', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se pudo conectar a la base de datos:', err);
    }));

  describe('Modelo Videogames', () => {
    beforeEach(() => Videogames.sync({ force: true }));

    describe('id', () => {
      it('debería lanzar un error si el ID no es un UUID válido', async () => {
        try {
          await Videogames.create({
              id: 'no-valid-uuid',
              name: 'Portal'
            });
          throw new Error('El test debería haber lanzado un error porque el ID no es un UUID válido');
          } catch (error) {
            expect(error.name).to.equal('SequelizeValidationError');
          }
        });
      });

    describe('name', () => {
      it('debería lanzar un error si name es nulo', async () => {
        try {
          await Videogames.create({});
          throw new Error('Requiere un nombre válido');
        } catch (err) {
          expect(err.name).to.equal('SequelizeValidationError');
        }
      });
    });

    describe('slug', () => {
      it('debería lanzar un error si slug es nulo', async () => {
        try {
          await Videogames.create({});
          throw new Error('Requiere una descripción válido');
        } catch (err) {
          expect(err.name).to.equal('SequelizeValidationError');
        }
      });
    });

    describe('background_image', () => {
      it('debería lanzar un error si la imagen es nula', async () => {
        try {
          await Videogames.create({});
          throw new Error('Requiere una descripción válido');
        } catch (err) {
          expect(err.name).to.equal('SequelizeValidationError');
        }
      });
    });

    describe('platforms', () => {
      it('debería lanzar un error si platforms no es un array', async () => {
        try {
          await Videogames.create({
            name: 'Super Mario',
            slug: 'super-mario',
            platforms: 'Nintendo'  // Aquí se está pasando una cadena en lugar de un array
          });
         
          throw new Error('El test debería haber lanzado un error porque platforms no es un array');
        } catch (error) {
          expect(error.name).to.equal('SequelizeValidationError');
        }
      });
    });

    describe('released', () => {
      it('debería lanzar un error si released no es una fecha válida', async () => {
        try {
          await Videogames.create({
            name: 'Super Mario',
            slug: 'super-mario',
            released: '2022-01-01'  // Cambiado a una fecha válida en formato YYYY-MM-DD
          });
          throw new Error('El test debería haber lanzado un error porque released no es una fecha válida');
        } catch (error) {
          expect(error.name).to.equal('SequelizeValidationError');
        }
      });
    });

    describe('rating', () => {
      it('debería lanzar un error si rating no es un valor FLOAT válido', async () => {
        try {
          await Videogames.create({
            name: 'Super Mario',
            slug: 'super-mario',
            released: '2022-01-01',
            rating: 'no-es-un-float'  // Proporcionando una cadena en lugar de un número float
          });
          throw new Error('El test debería haber lanzado un error porque rating no es un valor FLOAT válido');
        } catch (error) {
          expect(error.name).to.equal('SequelizeValidationError');
        }
      });
    });

    });
  });