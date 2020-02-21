require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const db = require("./data/dbModel");

const server = express();
const PORT = process.env.PORT;

server.use(express.json());
server.use(morgan("combined"));
server.use(helmet());

//* Resources
server.post("/api/resources", (req, res) => {
  const resource = req.body;
  db.insert("Resource", resource)
    .then(newResource => res.status(201).json(newResource))
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "unable to add resource", error: err });
    });
});

server.get("/api/resources", (req, res) => {
  // list of resources
  db.get("Resource")
    .then(resources => res.status(200).json(resources))
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "unable to retrieve resources", error: err })
    );
});

//* Projects
server.post("/api/projects", (req, res) => {
  const project = req.body;
  db.insert("Project", project)
    .then(newProject => res.status(201).json(newProject))
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "unable to add project", error: err });
    });
});

server.get("/api/projects", (req, res) => {
  // list of projects
  db.get("Project")
    .then(project => res.status(200).json(project))
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "unable to retrieve project", error: err })
    );
});

server.get("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  const project = await db
    .getById("Project", id)
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "unable to retrieve project", error: err })
    );
  const tasks = await db
    .getTasksById(id)
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "unable to retrieve tasks", error: err })
    );
  const resources = await db
    .get("Resource")
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "unable to retrieve resources", error: err })
    );

  res
    .status(200)
    .json({
      ...project,
      tasks: tasks,
      resources: resources
    })
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "Unable to retrieve Stretch Item", error: err })
    );
});

//* Tasks
server.post("/api/tasks", (req, res) => {
  const task = req.body;
  db.insert("Task", task)
    .then(newTask => res.status(201).json(newTask))
    .catch(err => {
      res.status(500).json({ errorMessage: "unable to add task", error: err });
    });
});

server.get("/api/tasks", (req, res) => {
  //List of tasks
  db.get("Task")
    .then(task => res.status(200).json(task))
    .catch(err =>
      res
        .status(500)
        .json({ errorMessage: "unable to retrieve task", error: err })
    );
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
