const pool = require("../config/database");
const status = require("../types/index");

class Announce{
  static async create(data,user_id){
    try{
      const client = await pool.connect();
      const {
        residue_id
      } = data;
      const { rows: announce } = await client.query(
        'INSERT INTO announce (statusAnnounce, company_id, residue_id) values ($1,$2,$3) RETURNING *',
        [ status.ANNOUNCE_TYPES.status1, user_id, residue_id]
      );
      await client.release();
      return announce;
    }catch(err){
      console.log('Cant create an announce');
    }
    return null;
  }

  static async findAll(){
    try{ 
      const client = await pool.connect();
      const {rows: announces} = await client.query(
        "SELECT * FROM announce"
      );
      await client.release();
      return announces;
    }catch(err){
      console.log('Cant find all announces');
    }
    return null;

  }

  static async findById(user_id, id_announce){
    try{
      const client = await pool.connect();
      const {rows: announce} = await client.query(
        "SELECT * FROM announce A, company C where A.company_id = $1 AND C.id_company = $1 AND A.id = $2 ",
        [user_id, id_announce]
      );
      await client.release();
      return announce;
    }catch(err){
      console.log('Cant find an announce');
    }
    return null;
  }

  static async update(data, user_id){
    try{
      const {
        id, statusAnnounce, craftsman_id, residue_id
      } = data;
      const client = await pool.connect();
      const {rows: announce} = await client.query(
        "UPDATE announce A set statusAnnounce = $1, craftsman_id = $2, residue_id = $3 WHERE A.company_id $4 AND A.id = $5 RETURNING *",
        [statusAnnounce, craftsman_id, residue_id, user_id, id]
      );
      await client.release();
      return announce;
    }catch(err){
      console.log('Cant update an announce');
    }
    return null;
  }

  static async findByIdAndDelete(user_id, id_announce){
    try{
      const client = await pool.connect();
      const {rows: announce} = await client.query(
        "DELETE FROM announce A, company C WHERE A.company_id = $1 AND A.id = $2 AND C.id_company = $1 AND C.id_company = A.company_id",
        [user_id, id_announce]
      );
      await client.release();
      return announce;
    }catch(err){
      console.log('Cant delete an announce');
    }
    return null;
  }
}

module.exports = Announce;