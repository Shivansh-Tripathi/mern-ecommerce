import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';
import routes from './routes';
// App config
const app = express();
const port = process.env.PORT || 4000;
// middleware
app.use(express.json());
app.use(cors());
// api endpoints
app.get('/', (req, res) => res.status(200).send('Hello World!'));
app.listen(port, () => console.log(`Listening on localhost:${port}`));