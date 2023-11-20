import { Router } from "express";
import Product from "../models/product";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", (req, res) => {
  Product.findAll()
    .then((products) => {
      res.json({
        status: {
          code: 200,
          message: "Success",
        },
        products,
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ status: { code: 500, message: "Internal server error" } });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Product.findByPk(id)
    .then((product) => {
      res.json({
        status: {
          code: 200,
          message: "Success",
        },
        product,
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ status: { code: 500, message: "Internal server error" } });
    });
});

router.get("/last/:limit", (req, res) => {
  const { limit } = req.params;
  Product.findAll({ limit: parseInt(limit), order: [["id", "DESC"]] })
    .then((products) => {
      res.json({
        status: {
          code: 200,
          message: "Success",
        },
        products,
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ status: { code: 500, message: "Internal server error" } });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization || "";

  jwt.verify(token, process.env.SECRET_KEY || "123", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: { code: 401, message: "Unauthorized" } });
    } else {
      Product.destroy({ where: { id } })
        .then(() => {
          res.json({
            status: {
              code: 200,
              message: "Success",
            },
          });
        })
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .json({ status: { code: 500, message: "Internal server error" } });
        });
    }
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, description, imageUrl } = req.body;
  const token = req.headers.authorization || "";

  console.log(req.body);

  jwt.verify(token, process.env.SECRET_KEY || "123", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: { code: 401, message: "Unauthorized" } });
    } else {
      Product.findByPk(id).then((product) => {
        product!
          .update({
            title,
            price,
            description,
            imageUrl,
          })
          .then(() => {
            res.json({
              status: {
                code: 200,
                message: "Success",
              },
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({
              status: { code: 500, message: "Internal server error" },
            });
          });
      });
    }
  });
});

export default router;
