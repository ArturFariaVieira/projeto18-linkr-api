import express from 'express';
import router from '../src/routes/indexRoutes.js';
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`)) 
