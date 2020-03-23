/**
 * Imported interfaces and external modules
**/

import express, { Request, Response } from "express";
import * as LettersService from "../generic.service";
import { Letter } from './Letter.interface';
// import { Letters } from "./Letters.interface";

// import { checkJwt } from "../../middleware/authorization.middleware";

/**
// * Router declaration
**/

export const lettersRouter = express.Router();

/**
// * API routes
**/

// * GET letters/test

// lettersRouter.get("/test", async (req: Request, res: Response) => {
//   try {
//     const q = 'SELECT NOW()';
//     const result = await LettersService.testPoolConnection(q);
//     return res.status(200).json(result);
//   } catch (e) {
//     res.status(404).json(e.message);
//   }
// });

// * GET letters/ 
// get all letters

lettersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const letters = await LettersService.findAll<Letter>('letters');
    // console.log(Letters);
    if (!letters.length) res.status(200).json(null); // no records found
    else res.status(200).json(letters);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * GET letters/:id 
// get letter by id

lettersRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const letter = await LettersService.find<Letter>(id, 'letters');
    if (!Object.keys(letter).length) res.status(200).json(null);  // no records found
    res.status(200).json(letter);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * Mount authorization middleware

// lettersRouter.use(checkJwt);

// ! all controllers from here on down are protected, and require an access JSON Web Token

// * POST letters/ 
// post a letter

lettersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const letter: Letter = req.body;
    await LettersService.create<Letter>(letter, 'letters');
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * PUT letters/:id

lettersRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const letter: Letter = req.body;
    await LettersService.update<Letter>(letter, id, 'letters');
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * DELETE Letters/:id

// lettersRouter.use(checkJwt);

lettersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const response = await LettersService.remove<Letter>(id, 'letters');
    if (response.affectedRows === 0) res.status(404).json(`No Letter found with id: ${id}`)
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json(e.message);
  }
});
