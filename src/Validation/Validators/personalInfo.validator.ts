import { z } from "zod";
import {
validateRule
} from "../Rules/Rules";

export const personalInfoSchema = z.object({
  name: z
    .string()
    .nonempty("nombre-vacio")
    .refine((value) => validateRule({name: 'digits', value: value}), "nombre-no-valido"),
  lastName: z
    .string()
    .nonempty("apellido-vacio")
    .refine((value) => validateRule({name: 'digits', value: value}), "apellido-no-valido"),
  email: z
    .string()
    .nonempty("correo-vacio")
    .refine((value) => validateRule({name: 'email', value: value}), "correo-no-valido"),
  phone: z
    .string()
    .nonempty("telefono-vacio")
    .refine(
      (value) => validateRule({name: 'phone', value: value}) && !validateRule({name: 'digits', value: value}),
      "telefono-no-valido"
    ),
  password: z
    .string()
    .nonempty("contrasena-vacia")
    .min(8, "contrasena-muy-corta")
    .refine((value) => !validateRule({name: 'digits', value: value}), "contrasena-debe-tener-digito")
    .refine(
      (value) => validateRule({name: 'specialCharacter', value: value}),
      "contrasena-debe-tener-caracter-especial"
    ).refine((value) => !validateRule({name: 'upperCase', value: value}), 'contrasena-debe-tener-letra-mayuscula'),
});