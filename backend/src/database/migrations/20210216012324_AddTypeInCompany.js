
exports.up = function(knex) {
  return knex.schema.alterTable('company', (table) => {
    table.string("type").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('company', (table) => {
    table.dropColumn('type');
  });
};
