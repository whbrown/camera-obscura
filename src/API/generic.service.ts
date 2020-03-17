/**
// * Imported interfaces and external modules
**/
import mysql from 'mysql2/promise';
import pool from '../mySqlPool';
import * as dotenv from "dotenv";
import { Person } from './persons/Person.interface';
import { Letter } from './letters/Letter.interface';
import { LookupLetterPerson } from './lookupTables/LookupLetterPerson.interface';

type Article = Person | Letter | LookupLetterPerson;
type Table = 'persons' | 'letters' | 'lookup_letters_persons';

dotenv.config();

/**
 * Service methods
**/
type QueryResponse = mysql.OkPacket | mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket[]

// export async function testPoolConnection<T extends Article>(query: string, tableName: Table): Promise<QueryResponse> {
//   const [rows] = await pool.query(query);
//   return rows;
// }

export async function findAll<T extends Article>(tableName: Table): Promise<mysql.RowDataPacket[]> {
  const query = `SELECT * FROM ${tableName}`;
  const [rows, fields] = await pool.execute<mysql.RowDataPacket[]>(query);
  console.log(fields);
  return rows;
}

export async function find<T extends Article>(id: number, tableName: Table): Promise<mysql.RowDataPacket> {
  const query = `SELECT * FROM ${tableName} WHERE id = ?`;
  const [rows] = await pool.execute<mysql.RowDataPacket[]>(query, [id]);
  console.log(rows);
  if (rows) {
    return rows[0];
  }
  throw new Error('No record found');
}

export async function create<T extends Article>(newArticle: T, tableName: Table): Promise<mysql.OkPacket> {
  const columns = Object.keys(newArticle) as (keyof T)[];
  const values = columns.map(col => newArticle[col]);
  const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
  console.log('prepared statement:', query, values);
  const [rows] = await pool.execute<mysql.OkPacket>(query, values);
  return rows;
}

export async function update<T extends Article>(Article: T, id: number, tableName: Table): Promise<mysql.OkPacket> {
  const columns = Object.keys(Article) as (keyof T)[];
  const values = columns.map(col => Article[col]);
  const query = `UPDATE ${tableName} SET ${columns.map(col => `${col} = ?`)} WHERE id = ${id}`;
  console.log('prepared statement:', query, values);
  const [rows, fields] = await pool.execute<mysql.OkPacket>(query, values);
  console.log('fields', fields);
  console.log('rows', rows);
  return rows;
}

export async function remove<T extends Article>(id: number, tableName: Table): Promise<mysql.OkPacket> {
  // delete is reserved term
  const query = `DELETE FROM ${tableName} WHERE id = ${id}`;
  const [rows] = await pool.execute<mysql.OkPacket>(query);
  return rows;
}