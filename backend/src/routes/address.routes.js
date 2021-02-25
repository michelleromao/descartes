const express = require("express");

const addressRoutes = express.Router();

addressRoutes.get("/address", (request, response) =>{
  return response.json({message: "ok"})
});
addressRoutes.get("/address/:id", (request, response) =>{
  return response.json({message: "ok"})
});
addressRoutes.post("/address/", (request, response) =>{
  return response.json({message: "ok"})
});
addressRoutes.put("/address/:id", (request, response) =>{
  return response.json({message: "ok"})
});

module.exports = addressRoutes;
