const db = require("../data/dbModel");

module.exports = {
  validateProjectId,
  validateResource,
  validateProject,
  validateTask
};

function validateProjectId(req, res, next) {
  const { id } = req.params;
  db.getById("Project", id).then(count => {
    if (!count.length) {
      res.status(404).send({ errorMessage: "No project with that id" });
    }
    next();
  });
}

function validateResource(req, res, next) {
  const resource = req.body;
  if (!resource.name) {
    res.status(300).json({ errorMessage: "please provide resource name" });
  } else if (!resource.description) {
    res
      .status(300)
      .json({ errorMessage: "please provide resource description" });
  }
  next();
}

function validateProject(req, res, next) {
  const project = req.body;
  if (!project.name) {
    res.status(300).json({ errorMessage: "please provide project name" });
  } else if (!project.description) {
    res
      .status(300)
      .json({ errorMessage: "please provide project description" });
  }
  next();
}

function validateTask(req, res, next) {
  const task = req.body;
  if (!task.project_id) {
    res.status(300).json({ errorMessage: "please provide task project_id" });
  } else if (!task.name) {
    res.status(300).json({ errorMessage: "please provide task name" });
  }
  next();
}
