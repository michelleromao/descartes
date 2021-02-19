const pool = require("../config/database");
const status = require("../types/index");

class FavoriteMaterial{
  static async create(craftsman_id, data){
    try{
      const client = await pool.connect();
      const {
        material_id
      } = data;
      const { rows: favorite_material } = await client.query(
        'INSERT INTO favorite_material (craftsman_id, material_id) values ($1,$2) RETURNING *',
        [craftsman_id, material_id]
      );
      await client.release();
      return favorite_material;
    }catch(err){
      console.log('Cant favorite the material');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const {rows: favorite_material} = await client.query(
        "SELECT * FROM favorite_material"
      );
      await client.release();
      return favorite_material;
    }catch(err){
      console.log('Cant find the favorite materials');
    }
    return null;
  }

  static async findById(id){
    try{
      const client = await pool.connect();
      const {rows: favorite_material} = await client.query(
        "SELECT * FROM favorite_material FC where FM.id = $1",
        [id]
      );
      await client.release();
      return favorite_material;
    }catch(err){
      console.log('Cant find the favorite material');
    }
    return null;
  }

  static async findByIdAndDelete(id){
    try{
      const client = await pool.connect();
      const {rows: favorite_material} = await client.query(
        "DELETE FROM favorite_material FC WHERE FM.id = $1",
        [id]
      );
      await client.release();
      return favorite_material;
    }catch(err){
      console.log('Cant delete the favorite material');
    }
    return null;
  }
}

module.exports = FavoriteMaterial;