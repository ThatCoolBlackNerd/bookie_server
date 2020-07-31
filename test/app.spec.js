const knex = require('../db/knex');
const app = require('../src/app')
const fixtures = require('./fixtures');

describe('App', () => {  // Before every test
  before((done) => {
    //run migrations
    knex.migrate.latest()
      .then(() => {
        // run seeds
        return knex.seed.run(); 
      }).then(() => done());
  });

  it('GET / responds with 200 containing "Hello, boilerplate!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, boilerplate!')
  })
})