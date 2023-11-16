import express, { Request, Response } from "express";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()).use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World", query: req.query });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
