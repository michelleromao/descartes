
exports.up = function(knex) {
  return knex.schema.createTable('residue', (table) => {
    table.uuid("id").defaultTo(knex.raw('uuid_generate_v4()')).primary('residue_pk');
    table.integer("quantity");
    table.float("size");
    table.timestamp("availability", { useTz: true }).notNullable();
    table.enu("status",['requested','collected']);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('residue');
  
};
