import { Router } from "express";
import Cart from "../models/cart";

const router = Router();

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
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
});

export default router;
