import type { Request, Response, NextFunction } from "express";
import { type ZodType, ZodError } from "zod";
import { createproductSchema } from "../schemas/product.schemas.js"
import { createCustomersSchema } from "../schemas/customer.schemas.js";

export const validateDatos = (schema:ZodType) => async(req: Request, res:Response, next: NextFunction): Promise<void> => {
    try {
        req.body= await schema.parseAsync(req.body);
        next()
    } catch (error) {
        if(error instanceof ZodError){
            res.status(400).json({
                error: error.issues
            })
            return
        }
        res.status(500).json({
            message: "error interno del servidor"
        })
    }
}

