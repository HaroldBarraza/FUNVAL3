import { pool } from "../config/db.js";

export interface Customer {
    id: number;
    nombre: string;
    appaterno: string;
    apmaterno: string;
    email: string;
    phone_number: string
}

export type createcustomer = Omit<Customer,"id">
export type updatecustomer = Partial<createcustomer>

export const Customermodel = {
    findall: async(): Promise<Customer[]> => {
        const { rows } = await pool.query("SELECT * FROM customers");
        return rows
    },
    findcustomerbyID: async(id_customer: number): Promise<Customer[]> => {
        const { rows } = await pool.query("SELECT * FROM customers WHERE id_customer = $1", [id_customer])
        return rows[0] || null
    },
    createcustomer: async(datos: createcustomer): Promise<Customer> => {
        const {nombre, appaterno, apmaterno, email, phone_number} = datos
        const query = "INSERT INTO customers (nombre, appaterno, apmaterno, email, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *"
        const { rows } = await pool.query(query,[nombre, appaterno, apmaterno, email, phone_number])
        return rows[0]
    
    },
    updatecustomer: async(id_customer:number, datos:updatecustomer):Promise<Customer | null> => {
        const {nombre, appaterno, apmaterno, email, phone_number} = datos
        let query = "UPDATE customers SET "
        const param: any[] = []
        let index = 1
        let numero_actualizaciones = 0
        if(nombre !== undefined){
            query += `nombre = $${index++}, `
            param.push(nombre)
            numero_actualizaciones++
        }
        if(appaterno !== undefined){
            query += `appaterno = $${index++}, `
            param.push(apmaterno)
            numero_actualizaciones++
        }
        if(apmaterno !== undefined) {
            query += `apmaterno = $${index++}, `
            param.push(apmaterno)
            numero_actualizaciones++
        }
        if(email !== undefined){
            query += `email = $${index++}, `
            param.push(email)
            numero_actualizaciones++
        }
        if(phone_number !== undefined){
            query += `phone_number = $${index++}, `
            param.push(phone_number)
            numero_actualizaciones++
        }
        query = query.slice(0, -2)
        query += ` WHERE id_customer = $${index} RETURNING *`
        param.push(id_customer)
        const {rows} = await pool.query(query, param)
        return rows[0] || null
    },
    deletecustomer: async (id_customer: number): Promise<boolean> => {
       const {rowCount} = await pool.query("DELETE FROM customers WHERE id_customer = $1", [id_customer])
       return (rowCount ?? 0)  > 0 
       
    },
    
}