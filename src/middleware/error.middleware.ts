/* eslint @typescript-eslint/no-unused-vars: 0 */

import HttpException from "../common/HttpException";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const status = error.statusCode || 500;
  const message =
    error.message || "It's not you. It's me. Something's wrong with the server, I see...";
  response.status(status).send(message);
};