/* eslint @typescript-eslint/no-unused-vars: 0 */
import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {

  const message = "Resource not found. Please check that you're using a documented API route.";

  response.status(404).send(message);
};