import express from "express";
import morgan from "morgan";
import axios from "axios";
import sequelize from "./config/database";
import routes from "./routes";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(express.json()).use(morgan("dev")).use(cors()).use(routes);

sequelize.authenticate();
sequelize
  .sync({ force: true })
  .then(() => {
    fs.readFile(
      __dirname + "/config/insertProduct.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        const products = JSON.parse(jsonString);
        products.map((product: any) => {
          sequelize.models.Product.create({
            title: product.title,
            description: product.description,
            price: product.price,
            imageUrl:
              "https://picsum.photos/seed/" + product.title + "/500/500",
            stock: product.stock,
          });
        });
      }
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default app;
