import { pool } from "../config/db.js";

export interface Product {
    id: number,
    nombre_producto: string,
    descripcion: string,
    precio: number
}

export type createproduct = Omit<Product, "id">
export type updateproduct = Partial<createproduct>

export const ProductModel = {
    findAll: async(): Promise<Product[]> => {
        const { rows } = await pool.query("SELECT * FROM products")
        return rows
    },
    findproductid: async(id_product:number):Promise<Product | null> => {
        const { rows } = await pool.query("SELECT * FROM products WHERE id_product = $1", [id_product])
        return rows[0] || null
    },
    createproduct: async(dato: createproduct): Promise<Product> => {
        const {nombre_producto, descripcion, precio} = dato
        const query = "INSERT INTO products (nombre_producto, descripcion, precio) VALUES ($1, $2, $3) RETURNING *"
        const { rows } = await pool.query(query, [nombre_producto, descripcion,precio])
        return rows[0]
    },
    updateproduct: async(id:number, dato: updateproduct):Promise<Product | null> => {
        const { nombre_producto, descripcion, precio } = dato
        let query = "UPDATE products SET "
        const param : any[]= []
        let index = 1
        let numeroactualizaciones = 0
        if(nombre_producto !== undefined){
            query += `nombre_producto = $${index++}, `
            param.push(nombre_producto)
            numeroactualizaciones++
        }
        if(descripcion !== undefined){
            query += `descripcion = $${index++}, `
            param.push(descripcion)
            numeroactualizaciones++
        }
        if(precio !== undefined){
            query += `precio = $${index++}, `
            param.push(precio)
            numeroactualizaciones++
        } 
        query = query.slice(0, -2)
        query += ` WHERE id_product = $${index} RETURNING *`
        param.push(id)
        const { rows } = await pool.query(query, param)
        return rows[0] || null
    },
    deleteproduct:async(id:number):Promise<boolean> => {
        const { rowCount } = await pool.query("DELETE FROM products WHERE id_product = $1", [id])
        return (rowCount ?? 0) > 0
    }
}