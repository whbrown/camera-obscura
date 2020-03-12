/**
 * Imported interfaces and external modules
**/

import express, { Request, Response } from "express";
import * as CorrespondentsService from "./correspondents.service";
import { Correspondent } from './correspondent.interface';
import { Correspondents } from "./correspondents.interface";


/**
 * Router declaration
**/

export const correspondentsRouter = express.Router();

/**
 * API routes
**/

// * GET correspondents/test

// correspondentsRouter.get("/test", async (req: Request, res: Response) => {
//   try {
//     const q = 'SELECT NOW()';
//     const result = await CorrespondentsService.testPoolConnection(q);
//     return res.status(200).json(result);
//   } catch (e) {
//     res.status(404).json(e.message);
//   }
// });

// * GET correspondents/

correspondentsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const correspondents = await CorrespondentsService.findAll();
    if (!Object.keys(correspondents).length) res.status(200).json(null); // no records found
    res.status(200).json(correspondents);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * GET correspondents/:id

correspondentsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const correspondent = await CorrespondentsService.find(id as 1 | 2);
    if (!Object.keys(correspondent).length) res.status(200).json(null);  // no records found
    res.status(200).json(correspondent);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * POST correspondents/

correspondentsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const correspondent: Correspondent = req.body;
    await CorrespondentsService.create(correspondent);
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * PUT correspondents/:id

correspondentsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const correspondent: Correspondent = req.body;
    await CorrespondentsService.update(correspondent, id);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * DELETE correspondents/:id

correspondentsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const response = await CorrespondentsService.remove(id);
    if (response.affectedRows === 0) res.status(404).json(`No correspondent found with id: ${id}`)
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).json(e.message);
  }
});
