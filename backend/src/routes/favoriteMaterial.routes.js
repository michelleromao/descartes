const express = require("express");

const favoriteMaterialRoutes = express.Router();

favoriteMaterialRoutes.get("/favorite_material", (request, response) =>{
  return response.json({message: "ok"})
});
favoriteMaterialRoutes.post("/favorite_material/", (request, response) =>{
  return response.json({message: "ok"})
});
favoriteMaterialRoutes.delete("/favorite_material/:id", (request, response) =>{
  return response.json({message: "ok"})
});

module.exports = favoriteMaterialRoutes;
