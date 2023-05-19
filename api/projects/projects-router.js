// "project" routerını buraya yazın!
const express = require("express");
const projectsModel = require("./projects-model");
const projectsMw = require("./projects-middleware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allPosts = await projectsModel.get();
    if (!allPosts) {
      res.json([]);
    } else {
      res.json(allPosts);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", projectsMw.validateProjectId, (req, res, next) => {
  try {
    res.json(req.currentProject);
  } catch (error) {
    next(error);
  }
});

router.post("/", projectsMw.validatePost, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newProject = { name: name, description: description };
    const insertedProject = await projectsModel.insert(newProject);
    res.json(insertedProject);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {});
router.delete("/", async (req, res, next) => {});
router.get("/", async (req, res, next) => {});

module.exports = router;
