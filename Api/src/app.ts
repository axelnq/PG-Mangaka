import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { PrismaClient } from '@prisma/client';
import { routes } from './routes/index'

export const db = new PrismaClient();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use('/api', routes);



// Error catching endware.
app.use((err: any, req: Request, res: Response, next: NextFunction) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({ message });
});


app.listen(3001, () => {
  console.log('Server listening on port 3001');
})