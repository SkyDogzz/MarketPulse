import { Router } from "express";
import Cart from "../models/cart";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const token = req.headers.authorization || "";
  console.log(token);
  jwt.verify(token, process.env.SECRET_KEY || "123", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: { code: 401, message: "Unauthorized" } });
    } else {
      Cart.findAll({ where: { userId } })
        .then((carts) => {
          res.json({
            status: {
              code: 200,
              message: "Success",
            },
            carts,
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization || "";
  jwt.verify(token, process.env.SECRET_KEY || "123", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: { code: 401, message: "Unauthorized" } });
    } else {
      Cart.destroy({ where: { id } })
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

router.put("/add/:id", (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization || "";
  jwt.verify(token, process.env.SECRET_KEY || "123", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: { code: 401, message: "Unauthorized" } });
    } else {
      Cart.findByPk(id)
        .then((cart) => {
          cart!.update({ quantity: cart!.quantity + 1 });
          res.json({
            status: {
              code: 200,
              message: "Success",
            },
            cart,
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

router.put("/remove/:id", (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization || "";
  jwt.verify(token, process.env.SECRET_KEY || "123", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: { code: 401, message: "Unauthorized" } });
    } else {
      Cart.findByPk(id)
        .then((cart) => {
          if (cart!.quantity === 1) {
            res.json({
              status: {
                code: 200,
                message: "Success",
              },
              cart,
            });
            return cart!.destroy();
          }
          cart!.update({ quantity: cart!.quantity - 1 });
          res.json({
            status: {
              code: 200,
              message: "Success",
            },
            cart,
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

export default router;
