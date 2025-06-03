import cors from "cors";
import express from "express";

import administradorController from "../controller/administradorController.js";
import artistaController from "../controller/artistaController.js";
import discoController from "../controller/discoController.js";

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/", administradorController);
app.use("/", artistaController);
app.use("/", discoController);

app.listen(5000, () => console.log("Server running on port 5000"));

export default app;
