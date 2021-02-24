
exports.up = function(knex) {
  return knex.schema.alterTable('announce', (table) => {
    table.uuid('residue_id').notNullable();
    table.foreign('residue_id', 'announce_residue_fk').references('residue.id').onUpdate('CASCADE').onDelete('SET NULL');
  });
};

exports.down = function(knex) {
  return knex.schema.table('announce', (table) => {
    table.dropForeign('residue_id', 'announce_residue_fk');
    table.dropColumn('residue_id');
  });
};
