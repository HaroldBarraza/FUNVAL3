import { Router } from "express";
import { getproducts, getproductsbyid, createproduct, updateproduct, deleteproduct } from "../controllers/product.controller.js"
import { validateDatos } from "../middlewares/validate-product.js"
import { createproductSchema } from "../schemas/product.schemas.js";

const router:Router = Router()

router.get("/menu", getproducts)
router.get("/menu/:id", getproductsbyid)
router.post("/menu/", validateDatos(createproductSchema) ,createproduct)
router.put("/menu/:id", updateproduct)
router.delete("/menu/:id", deleteproduct)

export default router