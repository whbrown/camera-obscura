import * as mysql from 'mysql2/promise';
import * as dotenv from "dotenv";

dotenv.config();

/**
  // * Create connection pool 
**/

interface MySQLConfig {
  host: string;
  user: string;
  password: string | void;
  database: string;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
}

const config = {
  host: process.env.DB_HOST_NAME,
  user: process.env.DB_USERNAME,
  // eslint-disable-next-line no-undef
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(config);


// Attempt to catch disconnects 
pool.on('connection', function (connection) {
  console.log(`MySQL Connection established, threadId: ${connection.threadId}`);

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });
});

pool.on('acquire', function (connection) {
  console.log(`Connection ${connection.threadId} acquired`);
});

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  console.log(`Connection ${connection.threadId} released`);
});

export default pool;