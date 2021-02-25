
exports.up = function(knex) {
  return knex.schema.createTable('announce', (table) => {
    table.uuid("id").defaultTo(knex.raw('uuid_generate_v4()')).primary('announce_pk');
    table.enu("statusAnnounce",['avaliable','reserved','donated']);
    table.uuid("company_id").notNullable();
    table.uuid("craftsman_id");
    table.timestamps(true, true);

    table.foreign('company_id', 'announce_company_fk').references('company.id_company').onUpdate('CASCADE').onDelete('SET NULL');
    table.foreign('craftsman_id', 'announce_craftsman_fk').references('craftsman.id_craftsman').onUpdate('CASCADE').onDelete('SET NULL');

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('announce');
  
};
