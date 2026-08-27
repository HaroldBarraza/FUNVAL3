import type { Request, Response } from "express";
import {Customermodel} from "../models/customers.model.js"
import { number } from "zod";

export const getcustomer = async(req:Request, res:Response) => {
/* 
#swagger.tags = ['Clientes']
#swagger.summary = 'Obtener tdos los clientes'

*/   
    try {
        const datos = await Customermodel.findall();
        res.json({total: datos.length, datos: datos})
    } catch (error:any) {
        console.log("hubo un error en controllers")
        res.status(500).json({error: error.message})
    }
}
export const getcustomerbyid = async(req:Request, res:Response) => {
/* 
#swagger.tags = ['Clientes']
#swagger.summary = 'obtener clientes por id'
#swagger.parameters['id'] = {
in: 'path',
description: 'ID del cliente',
required: true,
type: 'integer'
}

*/    
    try {
        const id = Number(req.params.id)
        if(isNaN(id)) {
            return res.status(400).json({error: "el id tiene que ser un nuemro valido"})
        }
        const datos = await Customermodel.findcustomerbyID(id)
        if(!datos){
            return res.status(404).json({error : "no se encontro al usurio solitictado"})
        }
        res.json({datos})
    } catch (error:any) {
        res.status(500).json({error: error.message})
    }

}
export const createcustomer = async(req:Request, res:Response) => {
 
/* 
#swagger.tags = ['Clientes']
#swagger.summary = 'Crear nuevos clientes'
#swagger.parameters['body'] = {
  in: 'body',
  description: 'Datos del cliente',
  required: true,
  schema: {
    nombre: 'Juan',
    appaterno: 'Paredes',
    apmaterno: 'Nina',
    email: 'example@example.com',
    phone_number: '+51987654321'
  }
}
*/
 
    try {
        const {nombre, appaterno, apmaterno, email, phone_number} = req.body
        
        const datos = await Customermodel.createcustomer({nombre, appaterno, apmaterno,email,phone_number})
        res.status(201).json(datos)
    } catch (error:any) {
        res.status(500).json({error: error.message})
    }
}
export const updatecustomer = async(req:Request, res:Response) => {
/* 
#swagger.tags = ['Clientes']
#swagger.summary = 'Actualizar información de clientes'
#swagger.parameters['id'] = {
  in: 'path',
  description: 'ID del cliente',
  required: true,
  type: 'integer'
}
#swagger.parameters['body'] = {
  in: 'body',
  description: 'Datos del cliente a actualizar (todos los campos son opcionales)',
  required: false,
  schema: {
    nombre: 'Juan',
    appaterno: 'Paredes',
    apmaterno: 'Nina',
    email: 'example@example.com',
    phone_number: '+51987654321'
  }
}
*/   
    try {
        const id = Number(req.params.id)
        if(isNaN(id)){
            return res.status(400).json({error: "el id tiene que ser un numoer valido"})
        }
        const encontrado = await Customermodel.findcustomerbyID(id)
        if(!encontrado){
            return res.status(404).json({error: "no se encontro al cliente con es id"})
        }
        const datos = await Customermodel.updatecustomer(id, req.body)
        if(!datos){
            return res.status(400).json({error:"tiene que efetuar al menos un cambio"})
        }
        res.status(200).json(datos)
    } catch (error:any) {
        res.status(500).json({error:error.message})
    }
}
export const deletecustomer = async(req:Request, res:Response) => {
/* 
#swagger.tags = ['Clientes']
#swagger.summary = 'eliminar a un cliente '
#swagger.parameters['id'] = {
in: 'path',
description: 'ID del cliente a eliminar',
required: true,
type: 'integer'
}

*/
    try {
        const id = Number(req.params.id)
    if(isNaN(id)){
        return res.status(400).json({error: "el id tiene que ser un numeor valido"})
    }
    const eliminado = await Customermodel.deletecustomer(id)
    if(!eliminado){
        return res.status(404).json({error :"no se encontro al cliente con ese id"})
    }
        res.status(200).json({message: "se elimino el cliente con exito", datos: eliminado})
    } catch (error:any) {
        res.status(500).json({error: error.message })
    }
}