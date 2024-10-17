import express, { NextFunction, Request, Response } from 'express';
import router from './routes/v1/routes';
import cors from "cors";

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
};

// Use CORS middleware
app.use(cors(corsOptions));

// parse json request body
app.use(express.json());

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