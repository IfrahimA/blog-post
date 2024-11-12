import { app } from './app.js';
import { initDatabase } from './db/init.js';
import dotenv from 'dotenv';
dotenv.config();

try {
	await initDatabase();
	const PORT = process.env.PORT;
	app.listen(PORT);
	console.log(`server is running on port http://localhost:${PORT}`);
} catch (error) {
	console.log('error connecting to the database:', error);
}