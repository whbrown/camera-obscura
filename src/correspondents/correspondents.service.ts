/**
// * Imported interfaces and external modules
**/
import mysql from 'mysql2/promise';
import pool from '../mySqlPool';
import * as dotenv from "dotenv";
import { Correspondent } from './correspondent.interface';
import { Correspondents } from './correspondents.interface';
import { Query } from 'mysql';
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
  const query = `SELECT * FROM correspondents`;
  const [rows] = await pool.execute(query);
  return rows;
}

export const find = async (id: number): Promise<QueryResponse> => {
  const query = `SELECT * FROM correspondents WHERE id = ?`;
  const [rows] = await pool.execute(query, [id]);
  if (rows) {
    return rows;
  }
  throw new Error('No record found');
};

export async function create(newCorrespondent: Correspondent): Promise<QueryResponse> {
  const columns = Object.keys(newCorrespondent) as (keyof Correspondent)[];
  const values = columns.map(col => newCorrespondent[col]);
  const query = `INSERT INTO correspondents (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
  console.log('prepared statement:', query, values);
  const [rows, fields] = await pool.execute(query, values);
  console.log('fields', fields);
  return rows;
}

export async function update(correspondent: Correspondent, id: number): Promise<QueryResponse> {
  const columns = Object.keys(correspondent) as (keyof Correspondent)[];
  const values = columns.map(col => correspondent[col]);
  const query = `UPDATE correspondents SET ${columns.map(col => `${col} = ?`)} WHERE id = ${id}`;
  console.log('prepared statement:', query, values);
  const [rows, fields] = await pool.execute(query, values);
  console.log('fields', fields);
  return rows;
}

export async function remove(id: number): Promise<mysql.OkPacket> {
  // delete is reserved term
  const query = `DELETE FROM correspondents WHERE id = ${id}`;
  const [rows] = await pool.execute(query);
  return rows as mysql.OkPacket;
}