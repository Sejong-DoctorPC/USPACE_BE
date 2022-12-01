import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
// Route
import rootRouter from "./routes/rootRouter.js";
import userRouter from "./routes/userRouter.js";
import "./db.js";
import corsOptions from "./config/corsOptions.js";
import allowedOrigins from "./config/allowedOrigins.js";
import { localsMiddleware } from "./middlewares.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "Hello!",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://yonghyun:47529722@diyparking.ddqzn68.mongodb.net/?retryWrites=true&w=majority",
    }),
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }, // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
