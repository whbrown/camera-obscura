/**
 * Imported interfaces and external modules
**/

import express, { Request, Response } from "express";
import * as LookupLetterRefPersonService from "../generic.service";
import { LookupLetterRefPerson } from './LookupLetterRefPerson.interface';
// import LookupLettersRefPersons from "./LookupLettersRefPersons.interface";

// import { checkJwt } from "../../middleware/authorization.middleware";

/**
// * Router declaration
**/

export const lookupLettersRefPersonsRouter = express.Router();

/**
// * API routes
**/

// * GET LookupLettersRefPersons/test

// lookupLettersRefPersonsRouter.get("/test", async (req: Request, res: Response) => {
//   try {
//     const q = 'SELECT NOW()';
//     const result = await LookupLetterRefPersonService.testPoolConnection(q);
//     return res.status(200).json(result);
//   } catch (e) {
//     res.status(404).json(e.message);
//   }
// });

// * GET lookupLettersRefPersons/ 
// get all LookupLetterRefPerson

lookupLettersRefPersonsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const LookupLetterRefPerson = await LookupLetterRefPersonService.findAll<LookupLetterRefPerson>('lookup_letters_refpersons');
    // console.log(LookupLetterRefPerson);
    if (!LookupLetterRefPerson.length) res.status(200).json(null); // no records found
    res.status(200).json(LookupLetterRefPerson);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * GET lookupLettersRefPersons/:id 
// get letter by id

lookupLettersRefPersonsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const letter = await LookupLetterRefPersonService.find<LookupLetterRefPerson>(id, 'lookup_letters_refpersons');
    if (!Object.keys(letter).length) res.status(200).json(null);  // no records found
    res.status(200).json(letter);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * Mount authorization middleware

// lookupLettersRefPersonsRouter.use(checkJwt);

// ! all controllers from here on down are protected, and require an access JSON Web Token

// * POST lookupLettersRefPersons/ 
// post a letter

lookupLettersRefPersonsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const letter: LookupLetterRefPerson = req.body;
    await LookupLetterRefPersonService.create<LookupLetterRefPerson>(letter, 'lookup_letters_refpersons');
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * PUT lookupLettersRefPersons/:id

lookupLettersRefPersonsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const letter: LookupLetterRefPerson = req.body;
    await LookupLetterRefPersonService.update<LookupLetterRefPerson>(letter, id, 'lookup_letters_refpersons');
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * DELETE LookupLettersRefPersons/:id

// lookupLettersRefPersonsRouter.use(checkJwt);

lookupLettersRefPersonsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const response = 
      await LookupLetterRefPersonService.remove<LookupLetterRefPerson>(id, 'lookup_letters_refpersons');
    if (response.affectedRows === 0) res.status(404).json(`No Letter found with id: ${id}`)
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json(e.message);
  }
});
