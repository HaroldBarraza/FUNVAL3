import * as z from "zod";

export const createproductSchema = z.object({
  name: z
    .string({
      message: "el nombre tiene que ser un string",
    })
    .trim()
    .min(1, {
      message: "el nombre el producto no puede estar vacio",
    }),
  description: z
    .string({
      message: "el mensaje tiene que ser un string",
    })
    .trim()
    .min(1, { message: "la description no puede estar vacio" }),
  price: z
    .number({
      message: "el price tiene que ser un numero",
    })
    .positive({
      message: "el price tiene que ser un numero positivo",
    }),
  cost: z
    .number({
      message: "el cost tiene que ser un numero",
    })
    .nonnegative({
      message: "el cost no puede ser un numero negativo",
    })
    .optional(),
  stock: z
    .number({
      message: "el stock tiene que ser un numero",
    })
    .int({
      message: "el stock no puede ser un numero decimal",
    })
    .nonnegative({
      message: "el stock no pude ser un numero negativo",
    })
    .optional(),
});
