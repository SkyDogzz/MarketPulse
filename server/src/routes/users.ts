import { Router } from "express";
import User from "../models/user";

const router = Router();

router.get("/", (req, res) => {
  User.findAll()
    .then((users) => {
      res.json({
        status: {
          code: 200,
          message: "Success",
        },
        users,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: { code: 500, message: "Internal server error" } });
    });
});

export default router;
