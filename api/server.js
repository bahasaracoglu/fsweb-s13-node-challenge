const express = require("express");
const server = express();
const projectsRouter = require("./projects/projects-router");

server.use(express.json());

server.use("/api/projects", projectsRouter);
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

module.exports = server;
