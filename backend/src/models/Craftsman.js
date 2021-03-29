const pool = require("../config/database");

class Craftsman{
  static async create(data){
    try{
      const client = await pool.connect();
      const {
        name, email, password, contact, cpf
      } = data;
      const { rows: craftsman } = await client.query(
        'INSERT INTO craftsman (name, email, password, contact, cpf) values ($1,$2,$3,$4,$5) RETURNING *',
        [name, email, password, contact, cpf]
      );
      await client.release();
      return craftsman;
    }catch(err){
      console.log('Cant create a craftsman');
    }
    return null;
  }

  static async findAll(){
    try{ 
      const client = await pool.connect();
      const {rows: craftsmen} = await client.query(
        "SELECT * FROM craftsman"
      );
      await client.release();
      return craftsmen;
    }catch(err){
      console.log('Cant find all craftsmen');
    }
    return null;
  }

  static async findById(id_craftsman){
    try{
      const client = await pool.connect();
      const {rows: craftsman} = await client.query(
        "SELECT * FROM craftsman C where C.id_craftsman = $1",
        [id_craftsman]
      );
      await client.release();
      return craftsman;
    }catch(err){
      console.log('Cant find a craftsman');
    }
    return null;
  }

  static async update(data, id_craftsman){
    try{
      const {
        name, avatar, email, password, contact, cpf
      } = data;
      const client = await pool.connect();
      const {rows: craftsman} = await client.query(
        "UPDATE craftsman C set name = $1, avatar = $2, email = $3, password = $4, contact = $5, cpf = $6 WHERE C.id_craftsman= $7 RETURNING *",
        [name, avatar, email, password, contact, cpf, id_craftsman]
      );
      await client.release();
      return craftsman;

    }catch(err){
      console.log('Cant update a craftsman');
    }
    return null;
  }
  
  static async findByIdAndDelete(id_craftsman){
    try{
      const client = await pool.connect();
      const {rows: craftsman} = await client.query(
        "DELETE FROM craftsman U WHERE U.id_craftsman = $1",
        [id_craftsman]
      );
      await client.release();
      return craftsman;
    }catch(err){
      console.log('Cant delete a craftsman');
    }
    return null;
  }
}

module.exports = Craftsman;