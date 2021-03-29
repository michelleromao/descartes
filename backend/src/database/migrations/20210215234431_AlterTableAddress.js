
exports.up = function(knex) {
  return knex.schema.alterTable('address', (table) => {
    table.uuid('user_id').notNullable();
    table.foreign('user_id', 'address_user_fk').references('users.id').onUpdate('CASCADE').onDelete('SET NULL');
  });
};

exports.down = function(knex) {
  return knex.schema.table('address', (table) => {
    table.dropForeign('user_id', 'address_user_fk');
    table.dropColumn('user_id');
  });
};
