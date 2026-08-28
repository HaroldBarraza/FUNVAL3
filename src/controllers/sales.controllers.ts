import type { Request, Response } from "express";
import { SaleModel } from "../models/sales.models.js"

export const getSales = async (req: Request, res: Response) => {
    /* 
    #swagger.tags = ['Ventas']
    #swagger.summary = 'Obtener todas las ventas con nombre del cliente'
    */
    try {
        const datos = await SaleModel.findAll();
        res.json({ 
            success: true,
            total: datos.length, 
            data: datos 
        });
    } catch (error: any) {
        console.log("hubo un error en controllers");
        res.status(500).json({ error: error.message });
    }
};

export const getSaleById = async (req: Request, res: Response) => {
    /* 
    #swagger.tags = ['Ventas']
    #swagger.summary = 'obtener venta por id con nombre del cliente'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la venta',
        required: true,
        type: 'integer'
    }
    */
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res
                .status(400)
                .json({ error: "el id tiene que ser un numero valido" });
        }
        const datos = await SaleModel.findById(id);
        if (!datos) {
            return res
                .status(404)
                .json({ error: "no se encontro la venta solicitada" });
        }
        res.json({ success: true, data: datos });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createSale = async (req: Request, res: Response) => {
    /* 
    #swagger.tags = ['Ventas']
    #swagger.summary = 'Crear una nueva venta'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos de la venta',
        required: true,
        schema: {
            customer_id: 1,
            fecha_pedido: '2024-01-15',
            estatus: 'pendiente'
        }
    }
    */
    try {
        const { customer_id, fecha_pedido, estatus } = req.body;

        // Validaciones básicas
        if (!customer_id) {
            return res.status(400).json({ 
                success: false,
                error: "El customer_id es obligatorio" 
            });
        }
        if (!estatus) {
            return res.status(400).json({ 
                success: false,
                error: "El estatus es obligatorio" 
            });
        }

        const fecha = fecha_pedido || new Date().toISOString().split('T')[0];

        const datos = await SaleModel.create({
            customer_id,
            fecha_pedido: fecha,
            estatus
        });

        res.status(201).json({ 
            success: true,
            message: "Venta creada exitosamente",
            data: datos 
        });
    } catch (error: any) {
        console.error("Error al crear venta:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const updateSale = async (req: Request, res: Response) => {
    /* 
    #swagger.tags = ['Ventas']
    #swagger.summary = 'Actualizar una venta existente'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la venta',
        required: true,
        type: 'integer'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos a actualizar (todos opcionales)',
        required: false,
        schema: {
            customer_id: 2,
            fecha_pedido: '2024-01-16',
            estatus: 'completado'
        }
    }
    */
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res
                .status(400)
                .json({ error: "el id tiene que ser un numero valido" });
        }

        // Verificar que existe
        const encontrado = await SaleModel.findById(id);
        if (!encontrado) {
            return res
                .status(404)
                .json({ error: "no se encontro la venta con ese id" });
        }

        const datos = await SaleModel.update(id, req.body);
        if (!datos) {
            return res
                .status(400)
                .json({ error: "tiene que efectuar al menos un cambio" });
        }

        res.status(200).json({ 
            success: true,
            message: "Venta actualizada exitosamente",
            data: datos 
        });
    } catch (error: any) {
        console.error("Error al actualizar venta:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteSale = async (req: Request, res: Response) => {
    /* 
    #swagger.tags = ['Ventas']
    #swagger.summary = 'Eliminar una venta'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la venta a eliminar',
        required: true,
        type: 'integer'
    }
    */
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res
                .status(400)
                .json({ error: "el id tiene que ser un numero valido" });
        }


        const encontrado = await SaleModel.findById(id);
        if (!encontrado) {
            return res
                .status(404)
                .json({ error: "no se encontro la venta con ese id" });
        }

        const eliminado = await SaleModel.delete(id);
        if (!eliminado) {
            return res
                .status(404)
                .json({ error: "no se pudo eliminar la venta" });
        }

        res.status(200).json({ 
            success: true,
            message: "se elimino la venta con exito" 
        });
    } catch (error: any) {
        console.error("Error al eliminar venta:", error.message);
        res.status(500).json({ error: error.message });
    }
};