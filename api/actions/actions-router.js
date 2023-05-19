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
    res.json(req.currentAciton);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {});
router.put("/", async (req, res, next) => {});
router.delete("/", async (req, res, next) => {});

module.exports = router;
