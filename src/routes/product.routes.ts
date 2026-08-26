import { Router } from "express";
import { getproducts, getproductsbyid, createproduct, updateproduct, deleteproduct } from "../controllers/product.controller.js"


const router:Router = Router()

router.get("/menu", getproducts)
router.get("/menu/:id", getproductsbyid)
router.post("/menu/", createproduct)
router.put("/menu/:id", updateproduct)
router.delete("/menu/:id", deleteproduct)

export default router