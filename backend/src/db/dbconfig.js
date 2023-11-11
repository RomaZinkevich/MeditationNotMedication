const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: "easyease",
  host: "easyease.postgres.database.azure.com",
  port: 5432,
  database: "EasyEase",
  password: "MeditateNotMedicate.",
  ssl:{ca:fs.readFileSync("ssl.pem")}
});

// // Example query
// pool.query('SELECT * FROM your_table', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

module.exports = pool;