// eylemlerle ilgili ara katman yazılımları yazın

const actionsModel = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await actionsModel.get(req.params.id);
    if (!action) {
      res.status(404).json({ message: "Action not found" });
    } else {
      req.currentAction = action;
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateActionId };
