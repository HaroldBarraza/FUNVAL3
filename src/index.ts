import express, { type Request, type Response } from "express";
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors";
import { pool } from "./config/db.js";

const port = process.env.PORT;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/docs", swaggerRouter);

app.get("/", async (req: Request, res: Response) => {
  try {
    const tablas = await pool.query("SELECT * FROM products")
    res.json({menssage: "la conexion con la base de datos fue exitosa",
        total: tablas.rowCount,
        datos: tablas.rows
    })
  } catch (error) {
    console.error("Error al conecta a la base de datos");
    res.status(500).json({message:"error al conectarse con la base de datos"});
  }
});

app.get("/", (req: Request, res: Response) => {
  /*#swagger.tags = ['Tests']*/
  res.json({
    status: "Server online",
    version: "1.0.0",
  });
});

app.listen(port, () => {
  console.log(`URL: http://localhost:${port}`);
});
