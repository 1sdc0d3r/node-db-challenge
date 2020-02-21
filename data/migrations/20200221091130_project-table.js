exports.up = function(knex) {
  knex.schema.createTable("Project", tbl => {
    tbl.increments();
    tbl.string("name").notNullable();
    tbl.string("description");
    tbl.boolean("completed").default(false);
  });
  knex.schema.createTable("Task", tbl => {
    tbl.increments();
    tbl
      .integer("project_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("Project")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.string("name").notNullable();
    tbl.string("notes");
    tbl.boolean("completed").default(false);
  });
  knex.schema.createTable("Resource", tbl => {
    tbl.increments();
    tbl.string("name").notNullable();
    tbl.string("description");
  });
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists("Resource");
  knex.schema.dropTableIfExists("Task");
  knex.schema.dropTableIfExists("Project");
};
