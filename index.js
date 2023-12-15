import express, { json } from "express";
import cors from "cors";
import { defineEndpoints } from "./src/controllers/emailController";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());

defineEndpoints(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
