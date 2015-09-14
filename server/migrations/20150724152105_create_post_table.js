
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function (table) {
    table.increments();
    table.timestamps();

    table.string('title').notNullable();
    table.string('content').notNullable();
    table.dateTime('published_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
