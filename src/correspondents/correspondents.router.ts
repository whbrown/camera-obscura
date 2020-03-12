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

// * GET correspondents/

correspondentsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const correspondents: Correspondents = await CorrespondentsService.findAll();
    res.status(200).json(correspondents);
  } catch (e) {
    res.status(404).json(e.message);
  }
});

// * GET correspondents/:id

correspondentsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const correspondent: Correspondent = await CorrespondentsService.find(id as 1 | 2);
    res.status(200).json(correspondent);
  } catch (e) {
    res.status(404).json(e.message);
  }
});

// * POST correspondents/

correspondentsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const correspondent: Correspondent = req.body.item;
    await CorrespondentsService.create(correspondent);
    res.sendStatus(201);
  } catch (e) {
    res.status(404).json(e.message);
  }
});

// * PUT correspondents/

correspondentsRouter.put("/", async (req: Request, res: Response) => {
  try {
    const correspondent: Correspondent = req.body.item;
    await CorrespondentsService.update(correspondent);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// * DELETE correspondents/:id

correspondentsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await CorrespondentsService.remove(id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

