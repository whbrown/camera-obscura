/**
 * Imported interfaces and external modules
**/

import express, { Request, Response } from "express";
import * as PersonsService from "./persons.service";
import { Person } from './Person.interface';
// import { Persons } from "./Persons.interface";

import { checkJwt } from "../middleware/authorization.middleware";

/**
// * Router declaration
**/

export const personsRouter = express.Router();

/**
// * API routes
**/

// * GET Persons/test

// personsRouter.get("/test", async (req: Request, res: Response) => {
//   try {
//     const q = 'SELECT NOW()';
//     const result = await PersonsService.testPoolConnection(q);
//     return res.status(200).json(result);
//   } catch (e) {
//     res.status(404).json(e.message);
//   }
// });

// * GET Persons/

personsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const Persons = await PersonsService.findAll();
    if (!Object.keys(Persons).length) res.status(200).json(null); // no records found
    res.status(200).json(Persons);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * GET Persons/:id

personsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const Person = await PersonsService.find(id as 1 | 2);
    if (!Object.keys(Person).length) res.status(200).json(null);  // no records found
    res.status(200).json(Person);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * Mount authorization middleware

personsRouter.use(checkJwt);

// ! all controllers from here on down are protected, and require an access JSON Web Token

// * POST Persons/

personsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const Person: Person = req.body;
    await PersonsService.create(Person);
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * PUT Persons/:id

personsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const Person: Person = req.body;
    await PersonsService.update(Person, id);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * DELETE Persons/:id

personsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const response = await PersonsService.remove(id);
    if (response.affectedRows === 0) res.status(404).json(`No Person found with id: ${id}`)
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json(e.message);
  }
});
