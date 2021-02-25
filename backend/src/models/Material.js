const pool = require("../config/database");

class Material{
  static async findAll(){
    try{ 
      const client = await pool.connect();
      const {rows: materials} = await client.query(
        "SELECT * FROM material"
      );
      await client.release();
      return materials;
    }catch(err){
      console.log('Cant find all materials');
    }
    return null;
  }

  static async findById(id){
    try{
      const client = await pool.connect();
      const {rows: material} = await client.query(
        "SELECT * FROM material U where U.id = $1",
        [id]
      );
      await client.release();
      return material;
    }catch(err){
      console.log('Cant find a material');
    }
    return null;
  }

  static async findByName(name){
    try{
      const client = await pool.connect();
      const {rows: material} = await client.query(
        "SELECT * FROM material U where U.type = $1",
        [name]
      );
      await client.release();
      return material;
    }catch(err){
      console.log('Cant find a material');
    }
    return null;
  }
}

module.exports = Material;