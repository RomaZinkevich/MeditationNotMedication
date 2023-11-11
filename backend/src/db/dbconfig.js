const { Pool } = require('pg');
const fs = require('fs');
const dotenv = require("dotenv").config();

const SSL = process.env.SSL;
const db_user = process.env.DB_USER;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT; 
const db_name = (process.env.NODE_ENV === "BUILD") ? process.env.DB_NAME : process.env.DB_TESTNAME;
const db_password = process.env.DB_PASSWORD;

const pool = new Pool({
  user: db_user,
  host: db_host,
  port: db_port,
  database: db_name,
  password: db_password,
  ssl:{ca:SSL}
});


module.exports = pool;