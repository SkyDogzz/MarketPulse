import fs from "fs";
import sequelize from "./config/database";
import bcrypt from "bcrypt";
import { createStripeUser } from "./services/stripe";

export default function populate() {
  console.log("Populating database...");

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
          imageUrl: "https://picsum.photos/seed/" + product.title + "/500/500",
          stock: product.stock,
        });
      });
    }
  );

  const users = [
    {
      email: "jhon@doe.com",
      password: bcrypt.hashSync("123", 10),
      firstName: "Jhon",
      lastName: "Doe",
    },
    {
      email: "admin@admin.com",
      password: bcrypt.hashSync("admin", 10),
      firstName: "Admin",
      lastName: "Admin",
      isAdmin: true,
    },
  ];

  users.map((user) => {
    sequelize.models.User.create({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user?.isAdmin,
    });
    createStripeUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  })

  const cart = [
    {
      userId: 1,
      productId: 1,
      quantity: 2,
    },
    {
      userId: 2,
      productId: 2,
      quantity: 1,
    },
    {
      userId: 1,
      productId: 5,
      quantity: 1,
    },
  ];

  cart.map((item) => {
    sequelize.models.Cart.create({
      userId: item.userId,
      productId: item.productId,
      quantity: item.quantity,
    });
  });
}
