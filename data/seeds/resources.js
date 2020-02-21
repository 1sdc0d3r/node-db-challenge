exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Resource")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("Resource").insert([
        { name: "resource 1", description: "description" },
        { name: "resource 2", description: "description" },
        { name: "resource 3", description: "description" }
      ]);
    });
};
