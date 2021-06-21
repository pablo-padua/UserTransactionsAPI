import express from 'express';
import routes from './routes';
import cors from 'cors';
import { createConnection } from 'typeorm';

export const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
createConnection();

app.listen(process.env.PORT || 3333, () => {
    console.log('Server is Online');
});