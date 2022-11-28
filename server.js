import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// Route
import rootRouter from "./routes/rootRouter.js";
import userRouter from "./routes/userRouter.js";
import "./db.js";
import corsOptions from "./config/corsOptions.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credential: "true", // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);

app.use("/", rootRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
