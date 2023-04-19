require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { AppDataSource } from './utils/data-source';
import AppError from './utils/appError';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import messageRouter from './routes/message.routes';
import validateEnv from './utils/validateEnv';
import redisClient from './utils/connectRedis';
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import path from 'path'

const swaggerSpec = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Prueba Tecnica",
            version: "1.0.0"
        },
        servers:[{
            url:"http://localhost:3000"
        }],
    },
    apis:[`${path.join(__dirname, "./routes/*.routes.ts")}`]
}

AppDataSource.initialize()
  .then(async () => {
    validateEnv();
    const app = express();
    app.use(express.json());

    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

    app.use(cookieParser());

    app.use(
      cors()
    );

    
    // ROUTES
    app.use('/wires/auth', authRouter);
    app.use('/wires/users', userRouter);
    app.use('/wires/messages', messageRouter);
    
    app.use('/wires/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

    // HEALTH CHECKER
    app.get('/wires/healthChecker', async (_, res: Response) => {
      const message = await redisClient.get('try');

      res.status(200).json({
        status: 'success',
        message,
      });
    });

    // UNHANDLED ROUTE
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    // GLOBAL ERROR HANDLER
    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || 'error';
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    const port = config.get<number>('port');
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));

