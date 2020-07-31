
const wagers = require('../sample_data/wagers');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('wagers').del()
    .then(function () {
      // Inserts seed entries
      return knex('wagers').insert(wagers);
    });
};
