/**
 * Interfaces
**/

import { Correspondent } from './correspondent.interface';
import { Correspondents } from './correspondents.interface';

// dummy data

// export interface Correspondent {
//   id: number;
//   fname: string;
//   lname: string;
//   DOB: Date;
//   description: string;
//   image: string;
// }

const correspondents = {
  1: {
    id: 1,
    fname: 'Vincent',
    lname: 'van Gogh',
    DOB: new Date('1853/03/30'),
    DOD: new Date('1890/07/29'),
    description: 'loony painter!',
    image: '/static/assets/vvangogh.png'
  },
  2: {
    id: 2,
    fname: 'Albert',
    lname: 'Aurier',
    DOB: new Date('1865/03/30'),
    DOD: new Date('1892/10/05'),
    description: 'loony aesthete & essayist!',
    image: '/static/assets/aaurier.png'
  }
}

/**
 * Service methods
**/

export const findAll = async (): Promise<Correspondents> => {
  const allCorrespondents: Correspondents = correspondents // await mysql `SELECT * FROM correspondents`
  return allCorrespondents
};

export const find = async (id: number): Promise<Correspondent> => {
  if (typeof id !== 'number') throw new TypeError('id is an invalid type. Number expected.');
  const correspondent: Correspondent = correspondents[id as keyof typeof correspondents]; // await mysql `SELECT * FROM correspondents WHERE id = ${correspondent.id}`
  if (correspondent) {
    return correspondent;
  }
  throw new Error('No record found');
};

export const create = /*async*/ (newCorrespondent: Correspondent): void/*Promise<void>*/ => {
  // mysql INSERT INTO correspondents VALUES ()
}

export const update = /*async*/ (correspondent: Correspondent): void/*Promise<Correspondent>*/ => {
  if (typeof correspondent.id !== 'number') throw new TypeError('correspondent.id is an invalid type. Number expected.');
  // mysql `UPDATE correspondents SET () WHERE id = ${correspondent.id}`
  // mysql `SELECT * FROM correspondents WHERE id = ${correspondent.id}`
}

export const remove = /*async*/ (id: number): void/*Promise<Correspondent>*/ => {
  // delete is reserved term
  if (typeof id !== 'number') throw new TypeError('correspondent.id is an invalid type. Number expected.');
  // mysql `SELECT * FROM correspondents WHERE id = ${correspondent.id}`
  // mysql `DELETE FROM correspondents WHERE id = ${correspondent.id}`
}