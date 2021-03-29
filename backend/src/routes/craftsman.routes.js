const express = require("express");

const craftsmanRoutes = express.Router();

craftsmanRoutes.get("/craftsman", (request, response) =>{
  return response.json({message: "ok"})
});
craftsmanRoutes.get("/craftsman/:id", (request, response) =>{
  return response.json({message: "ok"})
});
craftsmanRoutes.post("/craftsman/", (request, response) =>{
  return response.json({message: "ok"})
});
craftsmanRoutes.put("/craftsman/:id", (request, response) =>{
  return response.json({message: "ok"})
});
craftsmanRoutes.delete("/craftsman/:id", (request, response) =>{
  return response.json({message: "ok"})
});

module.exports = craftsmanRoutes;
