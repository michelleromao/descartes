
exports.up = function(knex) {
  return knex.schema.createTable('favorite_company', (table) => {
    table.uuid("id").defaultTo(knex.raw('uuid_generate_v4()')).primary('favorite_company_pk');
    table.uuid("craftsman_id").notNullable();
    table.uuid("company_id").notNullable();
    table.timestamps(true, true);

    table.foreign('craftsman_id', 'favorite_company_craftsman_fk').references('craftsman.id_craftsman').onUpdate('CASCADE').onDelete('SET NULL');
    table.foreign('company_id', 'favorite_company_compnay_fk').references('company.id_company').onUpdate('CASCADE').onDelete('SET NULL');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorite_company');
};
