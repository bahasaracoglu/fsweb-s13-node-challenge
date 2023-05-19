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

router.put(
  "/:id",
  projectsMw.validateProjectId,
  projectsMw.validatePost,
  async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const newProject = { name: name, description: description };
      const updatedProject = await projectsModel.update(
        req.params.id,
        newProject
      );
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", projectsMw.validateProjectId, async (req, res, next) => {
  try {
    await projectsModel.remove(req.params.id);
    res.json({ message: "project deleted successfully" });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id/actions",
  projectsMw.validateProjectId,
  async (req, res, next) => {
    try {
      const projectActions = await projectsModel.getProjectActions(
        req.params.id
      );
      res.json(projectActions || []);
    } catch (error) {}
  }
);

module.exports = router;
