import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRouter from "./routes/searchRoute";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/search", searchRouter);

app.listen(process.env.PORT || 3002, () => {
  console.info("Server listening on port 3002");
});
