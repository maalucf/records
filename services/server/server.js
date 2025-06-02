import express from "express";

import artistaController from "../controller/artistaController.js";
import discoController from "../controller/discoController.js";

const app = express();

//Routes
app.use("/", artistaController);
app.use("/", discoController);

app.listen(5000, () => console.log("Server running on port 5000"));

export default app;
