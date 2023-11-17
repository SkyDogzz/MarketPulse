import { Router } from "express";
import Post from "../models/post";

const router = Router();

router.get("/", (req, res) => {
  Post.findAll()
    .then((posts) => {
      res.json({
        status: {
          code: 200,
          message: "Success",
        },
        posts,
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
