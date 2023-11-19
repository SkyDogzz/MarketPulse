import express from "express";
import morgan from "morgan";
import sequelize from "./config/database";
import routes from "./routes";
import cors from "cors";
import populate from "./populate";

const app = express();

app.use(express.json()).use(morgan("dev")).use(cors()).use(routes);

sequelize.authenticate();
sequelize
  .sync({ force: true })
  .then(() => {
    populate();
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });

export default app;
