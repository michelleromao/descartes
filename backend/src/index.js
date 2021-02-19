const express = require("express");
require("./database/index");

const app = express();
app.use(express.json());

app.get("/",(request, response) => {
  return response.send('iniciando backend')
})

app.listen(3333, () =>{
  console.log("Backend started!")
});