import { Router } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
      res
        .status(500)
        .json({ status: { code: 500, message: "Internal server error" } });
    });
});

router.post("/login", (req, res) => {
  const { email } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      console.log(user);
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const SECRET_KEY = process.env.SECRET_KEY || "123";
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
          expiresIn: "1h",
        });
        res.json({
          status: {
            code: 200,
            message: "Success",
          },
          user,
          token,
        });
      } else {
        res.json({
          status: {
            code: 404,
            message: "Email or password incorrect",
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

router.post("/register", (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  User.create({ email, password: passwordHash, firstName, lastName })
    .then((user) => {
      res.json({
        status: {
          code: 200,
          message: "Success",
        },
        user,
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
  const { email, password, firstName, lastName } = req.body;
  User.update({ email, password, firstName, lastName }, { where: { id } })
    .then(() => {
      return User.findByPk(id);
    })
    .then((user) => {
      res.json({
        status: {
          code: 200,
          message: "Success",
        },
        user,
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
  User.findByPk(id).then((user) => {
    User.destroy({ where: { id } })
      .then(() => {
        res.json({
          status: {
            code: 200,
            message: "Success",
          },
          user,
        });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ status: { code: 500, message: "Internal server error" } });
      });
  });
});

export default router;
