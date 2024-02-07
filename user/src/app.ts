import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

const app = express();
app.set('trust proxy', true);
app.use(json());

// Need to impliment this
// app.all('*', async () => {
//     throw new NotFoundError();
// });

// need to handle the error hanlder
// app.use(errorHandler);

export { app };
