import { number } from "zod";
import { pool } from "../config/db.js";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
}

export type createproduct = Omit<Product, "id">;
export type updateproduct = Partial<createproduct>;

export interface PaginaResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const ProductModel = {
  findfilters: async (
    page: number = 1,
    limit: number = 10,
    maxPrice?: number,
  ): Promise<PaginaResult<Product>> => {
    const condiciones: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (maxPrice !== undefined) {
      condiciones.push(`price <= $${index}`);
      index++;
      values.push(maxPrice);
    }

    const where =
      condiciones.length > 0 ? `WHERE ${condiciones.join(" AND ")}` : "";

    const coutQuery = `SELECT COUNT(*) FROM products ${where}`;
    const result = await pool.query(coutQuery, values);
    const total = Number(result.rows[0].count);

    const offset = (page - 1) * limit;
    const datavalues = [...values, limit, offset];
    const dataQuery = `SELECT * FROM products ${where} ORDER BY name ASC LIMIT $${index} OFFSET $${index + 1}`;
    const { rows } = await pool.query(dataQuery, datavalues);

    return {
      data: rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  },
  findAll: async (): Promise<Product[]> => {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  },
  findproductid: async (id_product: number): Promise<Product | null> => {
    const { rows } = await pool.query(
      "SELECT * FROM products WHERE id_product = $1",
      [id_product],
    );
    return rows[0] || null;
  },
  createproduct: async (dato: createproduct): Promise<Product> => {
    const { name, description, price, cost, stock } = dato;
    const query =
      "INSERT INTO products (name, description, price, cost, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const { rows } = await pool.query(query, [
      name,
      description,
      price,
      cost,
      stock,
    ]);
    return rows[0];
  },
  updateproduct: async (
    id: number,
    dato: updateproduct,
  ): Promise<Product | null> => {
    const { name, description, price, cost, stock } = dato;
    let query = "UPDATE products SET ";
    const param: any[] = [];
    let index = 1;
    let numeroactualizaciones = 0;
    if (name !== undefined) {
      query += `name = $${index++}, `;
      param.push(name);
      numeroactualizaciones++;
    }
    if (description !== undefined) {
      query += `description = $${index++}, `;
      param.push(description);
      numeroactualizaciones++;
    }
    if (price !== undefined) {
      query += `price = $${index++}, `;
      param.push(price);
      numeroactualizaciones++;
    }
    if (cost !== undefined) {
      query += `cost = $${index++}, `;
      param.push(cost);
      numeroactualizaciones++;
    }
    if (stock !== undefined) {
      query += `stock = $${index++}, `;
      param.push(stock);
      numeroactualizaciones++;
    }
    query = query.slice(0, -2);
    query += ` WHERE id_product = $${index} RETURNING *`;
    param.push(id);
    const { rows } = await pool.query(query, param);
    return rows[0] || null;
  },
  deleteproduct: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      "DELETE FROM products WHERE id_product = $1",
      [id],
    );
    return (rowCount ?? 0) > 0;
  },
};
