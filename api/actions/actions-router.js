// "eylem" routerını buraya yazın
const express = require("express");
const actionsModel = require("./actions-model");
const actionsMw = require("./actions-middlware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allActions = await actionsModel.get();
    res.json(allActions || []);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", actionsMw.validateActionId, (req, res, next) => {
  try {
    res.json(req.currentAction);
  } catch (error) {
    next(error);
  }
});

router.post("/", actionsMw.validatePost, async (req, res, next) => {
  const { project_id, notes, description, completed } = req.body;

  let postData = {
    project_id: project_id,
    notes: notes,
    description: description,
    completed: completed,
  };

  try {
    const insertedPost = await actionsModel.insert(postData);
    res.json(insertedPost);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {});
router.delete("/", async (req, res, next) => {});

module.exports = router;
