/**
 * Imported interfaces and external modules
**/

import express, { Request, Response } from "express";
import * as HistoricalObjectsService from "../generic.service";
import { HistoricalObject } from './HistoricalObject.interface';


// import { checkJwt } from "../../middleware/authorization.middleware";

/**
// * Router declaration
**/

export const historicalObjectsRouter = express.Router();

/**
// * API routes
**/

// * GET historical_objects/test

// historicalObjects.get("/test", async (req: Request, res: Response) => {
//   try {
//     const q = 'SELECT NOW()';
//     const result = await HistoricalObjectsService.testPoolConnection(q);
//     return res.status(200).json(result);
//   } catch (e) {
//     res.status(404).json(e.message);
//   }
// });

// * GET historical_objects/

historicalObjectsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const historicalObjects = await HistoricalObjectsService.findAll<HistoricalObject>('objects');
    if (!historicalObjects.length) res.status(200).json(null); // no records found
    else res.status(200).json(historicalObjects);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * GET historical_objects/:id

historicalObjectsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const historicalObject = await HistoricalObjectsService.find<HistoricalObject>(id, 'objects');
    if (!Object.keys(historicalObject).length) res.status(200).json(null);  // no records found
    res.status(200).json(historicalObject);
  } catch (e) {
    console.error(e);
    res.status(404).json(e.message);
  }
});

// * Mount authorization middleware

// historicalObjects.use(checkJwt);

// ! all controllers from here on down are protected, and require an access JSON Web Token

// * POST historical_objects/

historicalObjectsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const historicalObject: HistoricalObject = req.body;
    const { insertId } = await HistoricalObjectsService.create<HistoricalObject>(historicalObject, 'objects');
    res.location(`/api/v1/historical_objects/${insertId}`);
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * PUT historical_objects/:id

historicalObjectsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const historicalObject: HistoricalObject = req.body;
    await HistoricalObjectsService.update<HistoricalObject>(historicalObject, id, 'objects');
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message);
  }
});

// * DELETE historical_objects/:id

// historicalObjects.use(checkJwt);

historicalObjectsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    if (isNaN(id)) throw new TypeError('ID parameter is an invalid type. Integer expected.');
    const response = await HistoricalObjectsService.remove<HistoricalObject>(id, 'objects');
    if (response.affectedRows === 0) res.status(404).json(`No Object found with id: ${id}`)
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json(e.message);
  }
});
