import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './routes/router.js';

const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
