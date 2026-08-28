import express, { type Request, type Response } from "express";
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors";
import productrouter from "./routes/product.routes.js"
import customersrouter from "./routes/customers.routes.js"
import salesroute from "./routes/sales.routes.js"

const port = process.env.PORT;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/docs", swaggerRouter);

app.use("/api", productrouter)
app.use("/api", customersrouter)
app.use("/api", salesroute)

app.listen(port, () => {
  console.log(`URL: http://localhost:${port}`);
});

