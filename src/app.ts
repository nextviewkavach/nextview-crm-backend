import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import routes from "./routes/v1";
import errorHandler from "./middlewares/error-handler";
import { AppError } from "./types";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(hpp());

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again in 15 minutes!",
});

app.use("/api", limiter);
app.use("/api/v1", routes);
app.use(errorHandler);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(
    `Can't find ${req.originalUrl} on this server!`
  ) as AppError;
  err.statusCode = 404;
  err.status = "fail";
  next(err);
});

export default app;