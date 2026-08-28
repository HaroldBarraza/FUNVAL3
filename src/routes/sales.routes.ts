import { Router } from "express";
import {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
} from "../controllers/sales.controllers.js";

const router: Router = Router();

router.get("/sales", getSales);
router.get("/sales/:id", getSaleById);
router.post("/sales", createSale);
router.put("/sales/:id", updateSale);
router.delete("/sales/:id", deleteSale);

export default router;
