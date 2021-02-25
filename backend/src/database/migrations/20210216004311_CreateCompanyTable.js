
exports.up = function(knex) {
  return knex.schema.createTable('company', (table) => {
    table.uuid('id_company').defaultTo(knex.raw('uuid_generate_v4()')).primary('company_pk');
    table.string('cnpj').notNullable();
    table.string('selo');
    table.timestamps(true, true);
    table.inherits('users');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('company');
  
};
