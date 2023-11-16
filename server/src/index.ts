import express, { Request, Response } from "express";
import morgan from "morgan";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("marketpulse", "postgres", "yourpassword", {
  host: "db",
  port: 5432,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    sequelize.sync();
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()).use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World", query: req.query });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
