import express, { Express } from "express";
import userRouter from "../routes/user";
import cors from "cors";
import db from "../db/connection";
class Server {
  private app: Express;
  private port: string;
  private pathApi = {
    usersPath: "/api/users",
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    this.dbConnection();
    this.middlewares();
    this.routes();
  }
  async dbConnection() {
    try {
      await db.authenticate();
      console.log("DB online!");
    } catch (error) {
      console.log(error);
      throw new Error("Error connecting to DB");
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.pathApi.usersPath, userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Listening port !!", this.port);
    });
  }
}

export default Server;
