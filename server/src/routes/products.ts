import { Router } from "express";
import Product from "../models/product";

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

export default router;
