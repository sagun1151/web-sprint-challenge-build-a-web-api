// add middlewares here related to actions
const Actions = require('./actions-model')

async function checkActionId(req, res, next) {
    try {
      const projectId = await Actions.get(req.params.id);
      if (projectId) {
        next();
      } else {
        next({ status: 404, message: "no project with that id" });
      }
    } catch (err) {
      next(err);
    }
  }

  async function checkActionInfo(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    try {
      if (!project_id || !description || !notes) {
        next({ status: 400, message: "Requires both name and description" });
      } else {
        req.update = {project_id, description, notes, completed};
        next();
      }
    } catch (err) {
      next(err);
    }
  }

  module.exports = {
    checkActionId,
    checkActionInfo,
  };