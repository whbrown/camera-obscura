/* eslint no-undef: 0 */
/**
// * Required External Modules
**/

import * as dotenv from "dotenv";
import mysql from 'mysql2/promise';
import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import helmet from "helmet";

dotenv.config();

// * routers *
import { correspondentsRouter } from "./correspondents/correspondents.router";
// *

// * middleware *

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
// *

/**
// * App Variables
**/
if (!process.env.PORT) {
  console.error('PORT undefined')
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const server = express();

/**
// *  App Configuration
**/

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use("/api/v1/correspondents", correspondentsRouter);


// ! closing request-response cycle, no routes after this point!
server.use(errorHandler);
server.use(notFoundHandler); // notFound catch-all, last middleware fn

/**
// * Server On & Listening
**/

const listeningServer = server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
// * Webpack HMR Activation
**/

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: unknown;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: unknown) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => listeningServer.close());
}