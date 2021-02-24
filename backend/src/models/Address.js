const pool = require("../config/database");

class Address{
  static async create(data,user_id){
    try{
      const client = await pool.connect();
      const {
        zipcode, street, number, district, city, state, country
      } = data;
      const { rows: address } = await client.query(
        'INSERT INTO address (zipcode, street, number, district, city, state, country, user_id) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
        [zipcode, street, number, district, city, state, country, user_id]
      );
      await client.release();
      return address;
    }catch(err){
      console.log('Cant create an address');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const {rows: addresses} = await client.query(
        "SELECT * FROM address"
      );
      await client.release();
      return addresses;
    }catch(err){
      console.log('Cant find all addresses');
    }
    return null;
  }

  static async findById(user_id){
    try{
      const client = await pool.connect();
      const {rows: address} = await client.query(
        "SELECT * FROM address A where A.user_id = $1",
        [user_id]
      );
      await client.release();
      return address;
    }catch(err){
      console.log('Cant find an address');
    }
    return null;
  }

  static async update(data, user_id){
    try{
      const {
        id, zipcode, street, number, district, city, state, country
      } = data;
      const client = await pool.connect();
      const {rows: address} = await client.query(
        "UPDATE address A set zipcode = $1, street = $2, number = $3, district = $4, city = $5, state = $6, country = $7 WHERE A.id = $8 AND A.user_id = $9 RETURNING *",
        [zipcode, street, number, district, city, state, country, id, user_id]
      );
      await client.release();
      return address;

    }catch(err){
      console.log('Cant update an address');
    }
    return null;
  }
}

module.exports = Address;