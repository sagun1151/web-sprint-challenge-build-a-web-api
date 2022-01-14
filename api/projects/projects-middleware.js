// add middlewares here related to projects
const Projects = require("./projects-model");

async function checkProjectId(req, res, next) {
  try {
    const projectId = await Projects.get(req.params.id);
    if (projectId) {
      next();
    } else {
      next({ status: 404, message: "no project with that id" });
    }
  } catch (err) {
    next(err);
  }
}

async function checkInfoBody(req, res, next) {
  const { name, description, completed } = req.body;
  try {
    if (!name || !description || typeof completed === "undefined") {
      next({ status: 400, message: "Requires both name and description" });
    } else {
      req.update = { name, description, completed };
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkProjectId,
  checkInfoBody,
};
