import fs from "fs";
import sequelize from "./config/database";

export default function populate() {
  console.log("Populating database...");

  fs.readFile(
    __dirname + "/config/insertProduct.json",
    "utf8",
    (err, jsonString) => {
      console.log("File data:", jsonString);
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
          imageUrl: "https://picsum.photos/seed/" + product.title + "/500/500",
          stock: product.stock,
        });
      });
    }
  );
}
