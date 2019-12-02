import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// TODO: do we need to use morgan in production
app.use(morgan('dev', {}));

app.use(indexRouter);

app.use((err, req, res, next) => {
  if (err.status === 500) {
    return res.status(500).text('Please try again later!');
  }
  //   return res.status(500).send('Something happened');
  return res.status(500).send(err.message);
});

app.listen(process.env.PORT, () => {
  console.log('server up and running👏');
});
