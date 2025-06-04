import cors from "cors";
import express from "express";

import administradorController from "../controller/administradorController.js";
import artistaController from "../controller/artistaController.js";
import bandaController from "../controller/bandaController.js";
import discoController from "../controller/discoController.js";
import musicoController from "../controller/musicoController.js";

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/", administradorController);
app.use("/", artistaController);
app.use("/", bandaController);
app.use("/", discoController);
app.use("/", musicoController);

app.listen(5000, () => console.log("Server running on port 5000"));

export default app;
