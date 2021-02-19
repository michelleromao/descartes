const express = require("express");

const companyRoutes = express.Router();

companyRoutes.get("/company", (request, response) =>{
  return response.json({message: "ok"})
});
companyRoutes.get("/company/:id", (request, response) =>{
  return response.json({message: "ok"})
});
companyRoutes.post("/company/", (request, response) =>{
  return response.json({message: "ok"})
});
companyRoutes.put("/company/:id", (request, response) =>{
  return response.json({message: "ok"})
});
companyRoutes.delete("/company/:id", (request, response) =>{
  return response.json({message: "ok"})
});

module.exports = companyRoutes;
