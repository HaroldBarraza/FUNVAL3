import { pool } from "../config/db.js";
import { ProductModel, type PaginaResult, type Product } from "../models/product.model.js";

export interface filtrarProductos {
page?: string,
limit?: string,
maxPrice?: string
}

export const ProductosFiltrados = {
  getProductosWithFilter: async(query: filtrarProductos):Promise<PaginaResult<Product>> =>{
    let page = 1
    let limit = 10

    if(query.page){
      page = Number(query.page)
      if(isNaN(page) || page < 1 ) page = 1 
    }
    if(query.limit) {
      limit = Number(query.limit)
      if(isNaN(limit) || limit > 100) page = 100
    }
    let maxPrice:number | undefined
    if(query.maxPrice) {
      maxPrice = Number(query.maxPrice);
      if(isNaN(maxPrice)){
        throw new Error('maxPrice debe ser un nuemero valido')
      }
    }
    return await ProductModel.findfilters(
      page,
      limit,
      maxPrice
    )
  }
}