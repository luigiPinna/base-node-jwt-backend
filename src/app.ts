import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { AuthService } from "./services/AuthService";
import { AppDataSource } from "./data-source";

const app = express();
app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");

    const authService = new AuthService();

    app.post("/register", async (req, res) => {
      const { email, password, role } = req.body;
      try {
        const user = await authService.register(email, password, role);
        res.send(user);
      } catch (error) {
        res.status(400).send("User already exists or role not found");
      }
    });

    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      if (token) {
        res.send({ token });
      } else {
        res.status(400).send("Invalid credentials");
      }
    });

    app.listen(4000, () => {
      console.log("Server started on port 4000");
    });
  })
  .catch((error) => console.log(error));
