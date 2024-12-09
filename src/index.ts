import express, { Request, Response } from "express";
import componentsRoute from "./routes/components";
import cors from "cors";
import usersRoute from "./routes/user";
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/components/", componentsRoute);

app.use("/api/users/", usersRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
