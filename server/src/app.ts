import express from "express";
import morgan from "morgan";
import axios from "axios";
import sequelize from "./config/database";
import routes from "./routes";

const app = express();

app.use(express.json()).use(morgan("dev")).use(routes);

sequelize.authenticate();
sequelize
  .sync({ force: true })
  .then(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      const posts = response.data;
      posts.map((post: any) => {
        sequelize.models.Post.create({
          userId: post.userId,
          title: post.title,
          body: post.body,
        });
      });
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default app;
