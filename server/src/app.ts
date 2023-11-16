import express from "express";
import morgan from "morgan";
import sequelize from './config/database';
import routes from './routes';

const app = express();

app.use(express.json())
   .use(morgan("dev"))
   .use(routes);

sequelize.authenticate()
  sequelize.sync({ force: true })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

export default app;
