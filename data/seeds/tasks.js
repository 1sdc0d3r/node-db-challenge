exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("Task")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("Task").insert([
        { project_id: 1, name: "task1", notes: "notes", completed: true },
        { project_id: 1, name: "task2", notes: "notes", completed: false },
        { project_id: 1, name: "task3", notes: "notes", completed: false }
      ]);
    });
};
