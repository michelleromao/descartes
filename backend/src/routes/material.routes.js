const express = require("express");

const materialRoutes = express.Router();

materialRoutes.get("/material", (request, response) =>{
  return response.json({message: "ok"})
});
materialRoutes.get("/material/:id", (request, response) =>{
  return response.json({message: "ok"})
});

module.exports = materialRoutes;
