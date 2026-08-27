import * as z from "zod";

export const createCustomersSchema = z.object({
  nombre: z
    .string({ message: "el nombre tiene que ser un estring valido" })
    .trim()
    .min(1, { message: "el mombre no puede estar vacio" }),
  appaterno: z
    .string({ message: "el apellido paterno tiene que ser un string valido" })
    .trim()
    .min(1, { message: "el apellido paterno no puede estar vacio" }),
  apmaterno: z
    .string({ message: "el apellido materno tiene ser un string valido" })
    .trim()
    .min(1, { message: "el apellido materno no puede estar vacio" }),
  email: z
    .email({ message: "el email tiene que ser un email valido" })
    .trim()
    .min(1, { message: "el email no puede estar vacio" }),
  phone_number: z
    .string({ message: "el numero de telefono es invalido" })
    .trim()
    .min(5, {
      message:
        "el numero de telefono tiene que tener a menos 5 caracter validos",
    })
    .regex(/^\+?[0-9]+$/, { 
      message: "el número de teléfono solo puede contener dígitos" 
    }),
});

export const updateCustomersSchema = z.object({
  nombre: z
    .string({ message: "el nombre tiene que ser un estring valido" })
    .trim()
    .min(1, { message: "el mombre no puede estar vacio" })
    .optional(),
  appaterno: z
    .string({ message: "el apellido paterno tiene que ser un string valido" })
    .trim()
    .min(1, { message: "el apellido paterno no puede estar vacio" })
    .optional(),
  apmaterno: z
    .string({ message: "el apellido materno tiene ser un string valido" })
    .trim()
    .min(1, { message: "el apellido materno no puede estar vacio" })
    .optional(),
  email: z
    .email({ message: "el email tiene que ser un email valido" })
    .trim()
    .min(1, { message: "el email no puede estar vacio" })
    .optional(),
  phone_number: z
    .string({ message: "el numero de telefono es invalido" })
    .trim()
    .min(5, {
      message:
        "el numero de telefono tiene que tener a menos 5 caracter validos",
    })
    .regex(/^\+?[0-9]+$/, { 
      message: "el número de teléfono solo puede contener dígitos" 
    })
    .optional(),
});
