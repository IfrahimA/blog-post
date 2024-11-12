import express from 'express';
import { json } from 'express';
import { router } from './routes/posts.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());
app.use('/api', router);

app.get('/', (req, res) => {
	res.send('Hello from Express!');
});

export { app };
