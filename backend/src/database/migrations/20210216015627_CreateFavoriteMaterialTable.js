
exports.up = function(knex) {
  return knex.schema.createTable('favorite_material', (table) => {
    table.uuid("id").defaultTo(knex.raw('uuid_generate_v4()')).primary('favorite_material_pk');
    table.uuid("craftsman_id").notNullable();
    table.uuid("material_id").notNullable();
    table.timestamps(true, true);

    table.foreign('craftsman_id', 'favorite_material_craftsman_fk').references('craftsman.id_craftsman').onUpdate('CASCADE').onDelete('SET NULL');
    table.foreign('material_id', 'favorite_material_material_fk').references('material.id').onUpdate('CASCADE').onDelete('SET NULL');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorite_material');
};
