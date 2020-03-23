/**
 * Imported interfaces and external modules
**/

import express, { Request, Response } from "express";
import * as lookupLetterPersonService from "../generic.service";
import { LookupLetterPerson } from './LookupLetterPerson.interface';
// import { lookupLetterPerson } from "./lookupLetterPerson.interface";

// import { checkJwt } from "../../middleware/authorization.middleware";

/**
// * Router declaration
**/

export const lookupLettersPersonsRouter = express.Router();

/**
// * API routes
**/

// * GET lookupLetterPerson/test

// lookupLettersPersonsRouter.get("/test", async (req: Request, res: Response) => {
//   try {
//     const q = 'SELECT NOW()';
//     const result = await lookupLetterPersonService.testPoolConnection(q);
//     return res.status(200).json(result);
//   } catch (e) {
//     res.status(404).json(e.message);
//   }
// });

// * GET lookupLetterPerson/ 
// get all lookupLetterPerson

lookupLettersPersonsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const lookupLetterPerson = await lookupLetterPersonService.findAll<LookupLetterPerson>('lookup_letters_persons');
    // console.log(lookupLetterPerson);
    if (!lookupLetterPerson.length) res.status(200).json(null); // no records found
    else res.status(200).json(lookupLetterPerson);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * GET lookupLetterPerson/:id 
// get letter by id

lookupLettersPersonsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const letter = await lookupLetterPersonService.find<LookupLetterPerson>(id, 'lookup_letters_persons');
    if (!Object.keys(letter).length) res.status(200).json(null);  // no records found
    res.status(200).json(letter);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * Mount authorization middleware

// lookupLettersPersonsRouter.use(checkJwt);

// ! all controllers from here on down are protected, and require an access JSON Web Token

// * POST lookupLetterPerson/ 
// post a letter

lookupLettersPersonsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const letter: LookupLetterPerson = req.body;
    await lookupLetterPersonService.create<LookupLetterPerson>(letter, 'lookup_letters_persons');
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * PUT lookupLetterPerson/:id

lookupLettersPersonsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const letter: LookupLetterPerson = req.body;
    await lookupLetterPersonService.update<LookupLetterPerson>(letter, id, 'lookup_letters_persons');
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * DELETE lookupLetterPerson/:id

// lookupLettersPersonsRouter.use(checkJwt);

lookupLettersPersonsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const response = 
      await lookupLetterPersonService.remove<LookupLetterPerson>(id, 'lookup_letters_persons');
    if (response.affectedRows === 0) res.status(404).json(`No Letter found with id: ${id}`)
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json(e.message);
  }
});
