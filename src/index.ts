import express, { Request, Response } from "express";
import componentsRoute from "./routes/components";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/components", componentsRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
