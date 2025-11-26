// app.ts
import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.config";
import { storeRouter, customerRouter } from "@routes/index";

const app = express();
app.use(express.json());

app.use(cors(corsOptions));

const PORT = 3000;
const API_BASE = "/api/v1/bob-corns";

// prefijo general de API
app.use(API_BASE + "/store", storeRouter);
app.use(API_BASE + "/customer", customerRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}${API_BASE}`);
});
