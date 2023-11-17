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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Post.findByPk(id)
    .then((post) => {
      if (post) {
        res.json({
          status: {
            code: 200,
            message: "Success",
          },
          post,
        });
      } else {
        res.json({
          status: {
            code: 404,
            message: "Not found",
          },
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ status: { code: 500, message: "Internal server error" } });
    });
});

router.post("/", (req, res) => {
  const { userId, title, body } = req.body;
  Post.create({ userId, title, body })
    .then((post) => {
      res.json({
        status: {
          code: 200,
          message: "Success",
        },
        post,
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ status: { code: 500, message: "Internal server error" } });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { userId, title, body } = req.body;
  Post.update({ userId, title, body }, { where: { id } })
    .then((post) => {
      if (post) {
        res.json({
          status: {
            code: 200,
            message: "Success",
          },
          post,
        });
      } else {
        res.json({
          status: {
            code: 404,
            message: "Not found",
          },
        });
      }
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
  Post.destroy({ where: { id } })
    .then((post) => {
      if (post) {
        res.json({
          status: {
            code: 200,
            message: "Success",
          },
          post,
        });
      } else {
        res.json({
          status: {
            code: 404,
            message: "Not found",
          },
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ status: { code: 500, message: "Internal server error" } });
    });
});

export default router;
