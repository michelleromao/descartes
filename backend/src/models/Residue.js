const pool = require("../config/database");
const status = require("../types/index");

class Residue{
  static async create(data){
    try{
      const client = await pool.connect();
      const {
        quantity, size, availability, material_id
      } = data;
      const { rows: residue } = await client.query(
        'INSERT INTO residue (quantity, size, availability, material_id) values ($1,$2,$3,$4) RETURNING *',
        [ quantity, size, availability, material_id]
      );
      await client.release();
      return residue;
    }catch(err){
      console.log('Cant create an residue');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const {rows: residues} = await client.query(
        "SELECT * FROM residue"
      );
      await client.release();
      return residues;
    }catch(err){
      console.log('Cant find all residues');
    }
    return null;
  }

  static async findById(id){
    try{
      const client = await pool.connect();
      const {rows: residue} = await client.query(
        "SELECT * FROM residue R where R.id = $1",
        [id]
      );
      await client.release();
      return residue;
    }catch(err){
      console.log('Cant find an residue');
    }
    return null;
  }

  static async update(data, id){
    try{
      const {
        quantity, size, availability, status, material_id
      } = data;
      const client = await pool.connect();
      const {rows: residue} = await client.query(
        "UPDATE residue R set quantity = $1, size = $2, availability = $3, status = $4, material_id = $5 WHERE A.id = $6 RETURNING *",
        [quantity, size, availability, status, material_id, id]
      );
      await client.release();
      return residue;

    }catch(err){
      console.log('Cant update an residue');
    }
    return null;
  }

  static async findByIdAndDelete(id){
    try{
      const client = await pool.connect();
      const {rows: residue} = await client.query(
        "DELETE FROM residue R WHERE R.id = $1",
        [id]
      );
      await client.release();
      return residue;
    }catch(err){
      console.log('Cant delete an residue');
    }
    return null;
  }
}

module.exports = Residue;