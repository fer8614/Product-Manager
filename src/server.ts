import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

//Connect to DB
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log( colors.blue.bold ('Connection has been established successfully.'));
  } catch (error) {
    // console.log(error);
    console.log(colors.red.bold("Error connect to DB"));
  }
}

connectDB();

//instance express
const server = express();

// Enable CORS
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
server.use(cors(corsOptions));

//Read data from forms
server.use(express.json());

//Morgan
server.use(morgan("dev"));

server.use("/api/products", router);

//Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions),
);

export default server;
