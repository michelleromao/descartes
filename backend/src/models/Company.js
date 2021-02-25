const pool = require("../config/database");

class Company{
  static async create(data){
    try{
      const client = await pool.connect();
      const {
        name, email, password, contact, cnpj, type
      } = data;
      const { rows: company } = await client.query(
        'INSERT INTO company (name, email, password, contact, cnpj, type) values ($1,$2,$3,$4,$5,$6) RETURNING *',
        [name, email, password, contact, cnpj, type]
      );
      await client.release();
      return company;
    }catch(err){
      console.log('Cant create a company');
    }
    return null;
  }

  static async findAll(){
    try{ 
      const client = await pool.connect();
      const {rows: companies} = await client.query(
        "SELECT * FROM company"
      );
      await client.release();
      return companies;
    }catch(err){
      console.log('Cant find all companies');
    }
    return null;
  }

  static async findById(id_company){
    try{
      const client = await pool.connect();
      const {rows: company} = await client.query(
        "SELECT * FROM company C where C.id_company = $1",
        [id_company]
      );
      await client.release();
      return company;
    }catch(err){
      console.log('Cant find a company');
    }
    return null;
  }

  static async update(data, id_company){
    try{
      const {
        name, avatar, email, password, contact, cnpj, selo, type
      } = data;
      const client = await pool.connect();
      const {rows: company} = await client.query(
        "UPDATE company C set name = $1, avatar = $2, email = $3, password = $4, contact = $5, cnpj = $6, selo = $7, type = $8 WHERE C.id_company = $9 RETURNING *",
        [name, avatar, email, password, contact, cnpj, selo, type, id_company]
      );
      await client.release();
      return company;

    }catch(err){
      console.log('Cant update a company');
    }
    return null;
  }

  static async findByIdAndDelete(id_company){
    try{
      const client = await pool.connect();
      const {rows: company} = await client.query(
        "DELETE FROM company U WHERE U.id_company = $1",
        [id_company]
      );
      await client.release();
      return company;
    }catch(err){
      console.log('Cant delete a company');
    }
    return null;
  }
}

module.exports = Company;