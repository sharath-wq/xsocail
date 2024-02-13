import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';

const app = express();
app.set('trust proxy', true);
app.use(morgan('dev'));
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);

export { app };
