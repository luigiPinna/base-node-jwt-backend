import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { register, login } from "./controllers/authController";

const app = express();
app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");

    app.post("/register", register);
    app.post("/login", login);

    app.listen(4000, () => {
      console.log("Server started on port 4000");
    });
  })
  .catch((error) => console.log(error));
