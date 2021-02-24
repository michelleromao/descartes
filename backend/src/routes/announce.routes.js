const express = require("express");

const announceRoutes = express.Router();

announceRoutes.get("/announce", (request, response) =>{
  return response.json({message: "ok"})
});
announceRoutes.get("/announce/:id", (request, response) =>{
  return response.json({message: "ok"})
});
announceRoutes.post("/announce/", (request, response) =>{
  return response.json({message: "ok"})
});
announceRoutes.put("/announce/:id", (request, response) =>{
  return response.json({message: "ok"})
});
announceRoutes.delete("/announce/:id", (request, response) =>{
  return response.json({message: "ok"})
});

module.exports = announceRoutes;
