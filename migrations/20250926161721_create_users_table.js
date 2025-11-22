// migrations/20251122_create_users_and_events.js
exports.up = async function(knex) {
  // users table
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')); // requires pgcrypto extension or use uuid_generate_v4()
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });

  // events table
  await knex.schema.createTable('events', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.date('date').notNullable();
    table.integer('capacity').notNullable().defaultTo(0);
    table.integer('avail').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });

  // Note: If your Postgres doesn't have gen_random_uuid(), run:
  // CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  // or change defaultTo to knex.raw('uuid_generate_v4()') and enable uuid-ossp extension.
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('events');
  await knex.schema.dropTableIfExists('users');
};
