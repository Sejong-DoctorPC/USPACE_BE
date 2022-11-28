import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// Route
import rootRouter from "./routes/rootRouter.js";
import userRouter from "./routes/userRouter.js";
import "./db.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", rootRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
