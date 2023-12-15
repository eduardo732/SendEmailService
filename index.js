import express, { json } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import defineEndpoints from "./src/controllers/emailController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());

defineEndpoints(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
