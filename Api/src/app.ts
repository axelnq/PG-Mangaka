import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { PrismaClient } from '@prisma/client';
import { routes } from './routes/index'
import cors from "cors";
export const db = new PrismaClient();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// server.use(cors());

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