/* eslint no-undef: 0 */
/**
// * Required External Modules
**/

import * as dotenv from "dotenv";
// import mysql from 'mysql2/promise';
import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import helmet from "helmet";

dotenv.config();

// * routers *
import { personsRouter } from "./API/persons/persons.router";
import { lettersRouter } from './API/letters/letters.router';
import { lookupLettersPersonsRouter } from './API/lookupTables/lookupLettersPersons.router';
import { lookupLettersRefPersonsRouter } from './API/lookupTables/lookupLettersRefPersons.router';
import { historicalObjectsRouter } from "./API/historicalObjects/historicalObjects.router";
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

const app = express();

/**
// *  App Configuration
**/
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false // https://stackoverflow.com/questions/39870867/what-does-app-usebodyparser-json-do
}));
app.use("/api/v1/persons", personsRouter);
app.use("/api/v1/letters", lettersRouter);
app.use("/api/v1/lookup_letters_persons", lookupLettersPersonsRouter);
app.use("/api/v1/lookup_letters_refpersons", lookupLettersRefPersonsRouter);
app.use("/api/v1/historical_objects", historicalObjectsRouter);


// ! closing request-response cycle, no routes after this point!
app.use(errorHandler);
app.use(notFoundHandler); // notFound catch-all, last middleware fn

/**
// * Server On & Listening
**/
const server = app.listen(PORT, () => {
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
  module.hot.dispose(() => server.close());
}