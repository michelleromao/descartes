const pool = require("../config/database");
const status = require("../types/index");

class FavoriteCompany{
  static async create(craftsman_id, data){
    try{
      const client = await pool.connect();
      const {
        company_id
      } = data;
      const { rows: favorite_company } = await client.query(
        'INSERT INTO favorite_company (craftsman_id, company_id) values ($1,$2) RETURNING *',
        [craftsman_id, company_id]
      );
      await client.release();
      return favorite_company;
    }catch(err){
      console.log('Cant favorite the company');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const {rows: favorite_companies} = await client.query(
        "SELECT * FROM favorite_company"
      );
      await client.release();
      return favorite_companies;
    }catch(err){
      console.log('Cant find the favorite companies');
    }
    return null;
  }

  static async findById(id){
    try{
      const client = await pool.connect();
      const {rows: favorite_company} = await client.query(
        "SELECT * FROM favorite_company FC where FC.id = $1",
        [id]
      );
      await client.release();
      return favorite_company;
    }catch(err){
      console.log('Cant find the favorite company');
    }
    return null;
  }

  static async findByIdAndDelete(id){
    try{
      const client = await pool.connect();
      const {rows: favorite_company} = await client.query(
        "DELETE FROM favorite_company FC WHERE FC.id = $1",
        [id]
      );
      await client.release();
      return favorite_company;
    }catch(err){
      console.log('Cant delete the favorite company');
    }
    return null;
  }
}

module.exports = FavoriteCompany;