
exports.up = function(knex) {
  return knex.schema.alterTable('residue', (table) => {
    table.uuid("material_id").notNullable();
    table.foreign('material_id', 'residue_material_fk').references('material.id').onUpdate('CASCADE').onDelete('SET NULL');
  });
};

exports.down = function(knex) {
  return knex.schema.table('residue', (table) => {
    table.dropForeign('material_id', 'residue_material_fk');
    table.dropColumn('material_id');
  });
};
