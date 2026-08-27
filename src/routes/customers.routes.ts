import { Router } from "express";
import { getcustomer, getcustomerbyid, createcustomer, updatecustomer, deletecustomer} from "../controllers/customer.controller.js"
import { validateDatos } from "../middlewares/validate-product.js";
import { createCustomersSchema, updateCustomersSchema } from "../schemas/customer.schemas.js";

const router:Router = Router()

router.get("/customers", getcustomer)
router.get("/customers/:id", getcustomerbyid)
router.post("/customers/", validateDatos(createCustomersSchema), createcustomer)
router.put("/customers/:id", validateDatos(updateCustomersSchema),updatecustomer)
router.delete("/customers/:id", deletecustomer)

export default router