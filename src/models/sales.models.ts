import { pool } from "../config/db.js";

export interface Sale {
  id_sale: number;
  customer_id: number;
  fecha_pedido: string;
  estatus: string;
}

export type CreateSale = Omit<Sale, "id_sale">;
export type UpdateSale = Partial<CreateSale>;

export interface SaleWithCustomer extends Sale {
  nombre: string;
  appaterno: string;
  apmaterno: string;
  email: string;
  phone_number: string;
}

export const SaleModel = {
  findAll: async (): Promise<SaleWithCustomer[]> => {
    const query = `
            SELECT 
                s.id_sale,
                s.customer_id,
                s.fecha_pedido,
                s.estatus,
                c.nombre,
                c.appaterno,
                c.apmaterno,
                c.email,
                c.phone_number
            FROM sales s
            INNER JOIN customers c ON s.customer_id = c.id_customer
            ORDER BY s.fecha_pedido DESC
        `;
    const { rows } = await pool.query(query);
    return rows;
  },

  findById: async (id_sale: number): Promise<SaleWithCustomer | null> => {
    const query = `
            SELECT 
                s.id_sale,
                s.customer_id,
                s.fecha_pedido,
                s.estatus,
                c.nombre,
                c.appaterno,
                c.apmaterno,
                c.email,
                c.phone_number
            FROM sales s
            INNER JOIN customers c ON s.customer_id = c.id_customer
            WHERE s.id_sale = $1
        `;
    const { rows } = await pool.query(query, [id_sale]);
    return rows[0] || null;
  },

  create: async (datos: CreateSale): Promise<Sale> => {
    const { customer_id, fecha_pedido, estatus } = datos;
    const query = `
            INSERT INTO sales (customer_id, fecha_pedido, estatus) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;
    const { rows } = await pool.query(query, [
      customer_id,
      fecha_pedido,
      estatus,
    ]);
    return rows[0];
  },

  update: async (id_sale: number, datos: UpdateSale): Promise<Sale | null> => {
    const { customer_id, fecha_pedido, estatus } = datos;
    let query = "UPDATE sales SET ";
    const param: any[] = [];
    let index = 1;
    let numero_actualizaciones = 0;

    if (customer_id !== undefined) {
      query += `customer_id = $${index++}, `;
      param.push(customer_id);
      numero_actualizaciones++;
    }
    if (fecha_pedido !== undefined) {
      query += `fecha_pedido = $${index++}, `;
      param.push(fecha_pedido);
      numero_actualizaciones++;
    }
    if (estatus !== undefined) {
      query += `estatus = $${index++}, `;
      param.push(estatus);
      numero_actualizaciones++;
    }

    if (numero_actualizaciones === 0) {
      return null;
    }

    query = query.slice(0, -2);
    query += ` WHERE id_sale = $${index} RETURNING *`;
    param.push(id_sale);

    const { rows } = await pool.query(query, param);
    return rows[0] || null;
  },

  delete: async (id_sale: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      "DELETE FROM sales WHERE id_sale = $1",
      [id_sale],
    );
    return (rowCount ?? 0) > 0;
  },
};
