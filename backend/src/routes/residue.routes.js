const express = require("express");

const residueRoutes = express.Router();

residueRoutes.get("/residue", (request, response) =>{
  return response.json({message: "ok"})
});
residueRoutes.get("/residue/:id", (request, response) =>{
  return response.json({message: "ok"})
});
residueRoutes.post("/residue/", (request, response) =>{
  return response.json({message: "ok"})
});
residueRoutes.put("/residue/:id", (request, response) =>{
  return response.json({message: "ok"})
});
residueRoutes.delete("/residue/:id", (request, response) =>{
  return response.json({message: "ok"})
});

module.exports = residueRoutes;
