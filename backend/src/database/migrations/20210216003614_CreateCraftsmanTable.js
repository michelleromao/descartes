
exports.up = function(knex) {
  return knex.schema.createTable('craftsman', (table) => {
    table.uuid('id_craftsman').defaultTo(knex.raw('uuid_generate_v4()')).primary('craftsman_pk');
    table.string('cpf').notNullable();
    table.timestamps(true, true);
    table.inherits('users');
  })

};

exports.down = function(knex) {
  return knex.schema.dropTable('craftsman');
};
