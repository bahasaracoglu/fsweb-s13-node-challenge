// "project" routerını buraya yazın!
const express = require("express");
const projectsModel = require("./projects-model");
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

router.get("/", async (req, res, next) => {});
router.post("/", async (req, res, next) => {});
router.put("/", async (req, res, next) => {});
router.delete("/", async (req, res, next) => {});
router.get("/", async (req, res, next) => {});

module.exports = router;
