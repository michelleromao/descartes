
exports.up = function(knex) {
  return knex.schema.createTable('address', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary('address_pk');
    table.string('zipcode').notNullable();
    table.string('street').notNullable();
    table.string('number');
    table.string('district').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('country').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('address');
};
