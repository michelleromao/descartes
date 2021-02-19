
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary('users_pk');
    table.string('name').notNullable();
    table.string('avatar');
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('contact').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
