import express from "express";
import { apiRouter } from "./routes/routes";
import { pageRouter } from "./routes/pageRoutes";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(apiRouter);
app.use(pageRouter)

app.listen(3000, () => console.log("Cogumelo Store rodando em http://localhost:3000"));