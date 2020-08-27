const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.pgString;

const pool = new Pool({
  connectionString
});

module.exports = pool;
