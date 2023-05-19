// eylemlerle ilgili ara katman yazılımları yazın

const actionsModel = require("./actions-model");
const projectModel = require("../projects/projects-model");

async function validateActionId(req, res, next) {
  try {
    const action = await actionsModel.get(req.params.id);
    if (!action) {
      res.status(404).json({ message: "Action is not found" });
    } else {
      req.currentAction = action;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function validatePost(req, res, next) {
  const { description, project_id, notes } = req.body;
  try {
    if (description.length > 128 || !description || project_id <= 0 || !notes) {
      res.status(400).json({ message: "Please check the fields" });
    } else {
      const projectExists = await projectModel.get(project_id);
      if (!projectExists) {
        res
          .status(404)
          .json({ message: "Project with the given id does not exist" });
      } else {
        next();
      }
    }
  } catch (error) {}
}

module.exports = { validateActionId, validatePost };
