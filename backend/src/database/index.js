const dbConfig = require("../config/database");
const { Pool } = require('pg');

const pool = new Pool(dbConfig);

pool.query('SELECT NOW()', (err, res) => {
  console.log(res.rows)
  pool.end()
})

module.exports = pool;