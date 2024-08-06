/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Store', (table)=>{
    table.increments('id');
    table.string('userID', 100)
    table.string('itemName', 100)
    table.string('description', 100)
    table.integer('quantity')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Store')
};
