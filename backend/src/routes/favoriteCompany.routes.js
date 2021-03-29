const express = require("express");

const favoriteCompanyRoutes = express.Router();

favoriteCompanyRoutes.get("/favorite_company", (request, response) =>{
  return response.json({message: "ok"})
});
favoriteCompanyRoutes.post("/favorite_company/", (request, response) =>{
  return response.json({message: "ok"})
});
favoriteCompanyRoutes.delete("/favorite_company/:id", (request, response) =>{
  return response.json({message: "ok"})
});

module.exports = favoriteCompanyRoutes;
