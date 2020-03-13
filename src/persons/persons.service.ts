/**
// * Imported interfaces and external modules
**/
import mysql from 'mysql2/promise';
import pool from '../mySqlPool';
import * as dotenv from "dotenv";
import { Person } from './Person.interface';
// import { Persons } from './Persons.interface';
dotenv.config();

/**
 * Service methods
**/
type QueryResponse = mysql.OkPacket | mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket[]

export async function testPoolConnection(query: string): Promise<QueryResponse> {
  const [rows] = await pool.query(query);
  return rows;
}

export async function findAll(): Promise<QueryResponse> {
  const query = `SELECT * FROM persons`;
  const [rows] = await pool.execute(query);
  return rows;
}

export const find = async (id: number): Promise<QueryResponse> => {
  const query = `SELECT * FROM persons WHERE id = ?`;
  const [rows] = await pool.execute(query, [id]);
  if (rows) {
    return rows;
  }
  throw new Error('No record found');
};

export async function create(newPerson: Person): Promise<QueryResponse> {
  const columns = Object.keys(newPerson) as (keyof Person)[];
  const values = columns.map(col => newPerson[col]);
  const query = `INSERT INTO persons (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
  console.log('prepared statement:', query, values);
  const [rows, fields] = await pool.execute(query, values);
  console.log('fields', fields);
  return rows;
}

export async function update(Person: Person, id: number): Promise<QueryResponse> {
  const columns = Object.keys(Person) as (keyof Person)[];
  const values = columns.map(col => Person[col]);
  const query = `UPDATE persons SET ${columns.map(col => `${col} = ?`)} WHERE id = ${id}`;
  console.log('prepared statement:', query, values);
  const [rows, fields] = await pool.execute(query, values);
  console.log('fields', fields);
  return rows;
}

export async function remove(id: number): Promise<mysql.OkPacket> {
  // delete is reserved term
  const query = `DELETE FROM persons WHERE id = ${id}`;
  const [rows] = await pool.execute(query);
  return rows as mysql.OkPacket;
}