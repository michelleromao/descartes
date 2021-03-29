
exports.up = function(knex) {
  return knex.schema.createTable('material', (table) => {
    table.uuid("id").defaultTo(knex.raw('uuid_generate_v4()')).primary('material_pk');
    table.string("type").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('material');
  
};
