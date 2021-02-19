const pool = require("../config/database");

class Users{
  static async create(data,user_id){
    try{
      const client = await pool.connect();
      const {
        name, email, password, contact
      } = data;
      const { rows: user } = await client.query(
        'INSERT INTO users (name, email, password, contact) values ($1,$2,$3,$4) RETURNING *',
        [name, email, password, contact]
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant create an user');
    }
    return null;
  }

  static async findAll(){
    try{ 
      const client = await pool.connect();
      const {rows: users} = await client.query(
        "SELECT * FROM users"
      );
      await client.release();
      return users;
      
    }catch(err){
      console.log('Cant find all users');
    }
    return null;
  }

  static async findById(user_id){
    try{
      const client = await pool.connect();
      const {rows: user} = await client.query(
        "SELECT * FROM users U where U.user_id = $1",
        [user_id]
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant find an user');
    }
    return null;
  }

  static async update(data, user_id){
    try{
      const {
        name, email, password, contact
      } = data;
      const client = await pool.connect();
      const {rows: user} = await client.query(
        "UPDATE users U set name = $1, email = $2, password = $3, contact = $4 WHERE U.user_id = $5 RETURNING *",
        [name, email, password, contact, user_id]
      );
      await client.release();
      return user;

    }catch(err){
      console.log('Cant update an user');
    }
    return null;
  }

  static async findByIdAndDelete(user_id){
    try{
      const client = await pool.connect();
      const {rows: user} = await client.query(
        "DELETE FROM users U WHERE U.id = $1",
        [user_id]
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant delete an user');
    }
    return null;
  }
}

module.exports = Users;