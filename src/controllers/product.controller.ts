import { pool } from "../config/db.js";
import type { Request, Response } from "express";
import { ProductModel } from "../models/product.model.js";
import { ProductosFiltrados } from "../services/products.service.js";
import { success } from "zod";

export const getproducts = async (req: Request, res: Response) => {
/* 
  #swagger.tags = ['Productos']
  #swagger.summary = 'Obtener todos los productos con filtro maxPrice y paginación'
  #swagger.parameters['page'] = {
    in: 'query',
    description: 'Número de página',
    required: false,
    type: 'integer',
    default: 1
  }
  #swagger.parameters['limit'] = {
    in: 'query',
    description: 'Cantidad de resultados por página',
    required: false,
    type: 'integer',
    default: 10
  }
  #swagger.parameters['maxPrice'] = {
    in: 'query',
    description: 'Filtrar productos con precio menor o igual a este valor',
    required: false,
    type: 'number'
  }
  */

  try {
    const result = await ProductosFiltrados.getProductosWithFilter(req.query)
    res.json({ success: true,
      data: result.data,
      paginacion : {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPage: result.totalPages
      }
    })
  } catch (error: any) {
    console.error("Error al conecta a la base de datos");
    res.status(500).json({ error: error.message });
  }
};

export const getproductsbyid = async (req: Request, res: Response) => {
  /* 
#swagger.tags = ['Products']
#swagger.summary = 'Obtener un producto por el id'
#swagger.parameters['id'] = {
  in: 'path',
  description: 'ID del producto',
  required: true,
  type: 'integer'
}

*/
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "el id debe ser un numero valido" });
    }
    const encontrado = await ProductModel.findproductid(id);
    if (!encontrado) {
      return res
        .status(404)
        .json({ error: "no se encontro el producto por el id" });
    }
    res.json({ datos: encontrado });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createproduct = async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Products']
  #swagger.summary = 'Crear un nuevo producto'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos del producto',
    required: true,
    schema: {
      name: 'Ceviche',
      description: 'Pescado fresco con limón',
      price: 20.50,
      cost: 15.00,
      stock: 10
    }
  }
  */
  try {
    const { name, description, price, cost, stock } = req.body;
    const resultado = await ProductModel.createproduct({
      name,
      description,
      price,
      cost,
      stock,
    });
    res.status(201).json({ data: resultado });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const updateproduct = async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Products']
  #swagger.summary = 'Actualizar un producto existente'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID del producto',
    required: true,
    type: 'integer'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos a actualizar (todos los campos son opcionales)',
    required: false,
    schema: {
      name: 'Ceviche de Pescado',
      description: 'Pescado fresco con limón y cebolla',
      price: 22.00,
      cost: 18.00,
      stock: 8
    }
  }
  */
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "el id deber ser un numero valido" });
    }
    const producto = await ProductModel.findproductid(id);
    if (!producto) {
      return res
        .status(404)
        .json({ error: "no se encontro al producto con ese id" });
    }
    const resultado = await ProductModel.updateproduct(id, req.body);
    if (!resultado) {
      return res
        .status(400)
        .json({ error: "necesita actulizar almenos un elemento" });
    }
    res.status(202).json({ resultado });
  } catch (error: any) {
    console.error("error", error.message);
    res.status(500).json({ error: "hubo un error al actulizar el usuario" });
  }
};

export const deleteproduct = async (req: Request, res: Response) => {
  /* 
#swagger.tags = ['Products']
#swagger.summary = 'Eliminar un producto'
#swagger.parameters['id'] = {
  in: 'path',
  description: 'ID del producto a eliminar',
  required: true,
  type: 'integer'
}

*/
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ error: "el id tien que ser un numero valido" });
    }
    const resultado = await ProductModel.deleteproduct(id);
    if (!resultado) {
      return res
        .status(404)
        .json({ error: "no se encontro el producto con ese id" });
    }
    res.json({ message: "se elimino el prodcuto correctamente " });
  } catch (error: any) {
    console.error("error", error.message);
    res.status(500).json({ error: "hubo un error al eliminar al usuario" });
  }
};
