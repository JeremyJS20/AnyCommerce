import { z } from "zod";
import {
  checkHaveDigits,
  checkHaveSpecialCharacter,
  checkHaveUppercase,
  checkIsEmail,
  checkIsPhone,
} from "../Rules/Rules";

export const personalInfoSchema = z.object({
  name: z
    .string()
    .nonempty("nombre-vacio")
    .refine((value) => checkHaveDigits(value), "nombre-no-valido"),
  lastName: z
    .string()
    .nonempty("apellido-vacio")
    .refine((value) => checkHaveDigits(value), "apellido-no-valido"),
  email: z
    .string()
    .nonempty("correo-vacio")
    .refine((value) => checkIsEmail(value), "correo-no-valido"),
  phone: z
    .string()
    .nonempty("telefono-vacio")
    .refine(
      (value) => checkIsPhone(value) && !checkHaveDigits(value),
      "telefono-no-valido"
    ),
  password: z
    .string()
    .nonempty("contrasena-vacia")
    .min(8, "contrasena-muy-corta")
    .refine((value) => !checkHaveDigits(value), "contrasena-debe-tener-digito")
    .refine(
      (value) => checkHaveSpecialCharacter(value),
      "contrasena-debe-tener-caracter-especial"
    ).refine((value) => !checkHaveUppercase(value), 'contrasena-debe-tener-letra-mayuscula'),
});