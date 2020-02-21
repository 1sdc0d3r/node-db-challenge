const db = require("./dbConfig");

module.exports = {
  get,
  insert,
  getById,
  getTasksById
};

function get(table) {
  return db(table);
}

function getById(table, id) {
  //   if (table === "Task") {
  //     return db("Task").where({ project_id: id });
  //   }
  return db(table).where({ id });
}

function getTasksById(project_id) {
  return db("Task").where({ project_id });
}

function insert(table, payload) {
  return db(table)
    .insert(payload)
    .then(([id]) => getById(table, id));
}
