exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Project")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("Project").insert([
        { name: "Project 1", description: "description", completed: false },
        { name: "Project 2", description: "description", completed: true },
        { name: "Project 3", description: "description", completed: false }
      ]);
    });
};
