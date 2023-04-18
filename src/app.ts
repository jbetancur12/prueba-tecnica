require('dotenv').config();
import express, { Response } from 'express';
import config from 'config';
//import validateEnv from './utils/validateEnv';
import { AppDataSource } from './utils/data-source';

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    // validateEnv();

    const app = express();

    // MIDDLEWARE

    // 1. Body parser

    // 2. Logger

    // 3. Cookie Parser

    // 4. Cors

    // ROUTES


    // UNHANDLED ROUTE

    // GLOBAL ERROR HANDLER

    const port = config.get<number>('port');
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));

