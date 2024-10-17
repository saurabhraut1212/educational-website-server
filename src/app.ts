import express, { NextFunction, Request, Response } from 'express';
import router from './routes/v1/routes';
import cors from "cors";

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors({ origin: 'https://educational-website-khaki.vercel.app', optionsSuccessStatus: 200 }));

// v1 api routes
app.use('/v1', router);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});

// global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;