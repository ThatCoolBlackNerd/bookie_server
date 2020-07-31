

exports.up = function(knex) {
    return knex.schema.createTable('users', (table) =>{
        table.increments('id');
        table.text('name');
        table.string('email').notNullable();
        table.string('password').notNullable();
    })
    .createTable('wagers', (table) => {
        table.increments('id');
        table.text('bet').notNullable();
        table.enu('bet_type', ['Money', 'Food', 'Other']);
        table.string('stakes').notNullable();
        table.text('opponent').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.boolean('completed').defaultTo(false);
        table.integer('user_id').references('id').inTable('users');

    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('wagers').dropTable('users');
  
};
