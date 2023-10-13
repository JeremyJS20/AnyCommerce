import { z } from "zod";
import {
  validateRule,
} from "../Rules/Rules";

export const addressValidatorSchema = z.object({
  country: z
    .string()
    .nonempty("debe-seleccionar-pais"),
  state: z
    .string()
    .nonempty("debe-seleccionar-provincia"),
  city: z
    .string()
    .nonempty("debe-seleccionar-ciudad"),
  address: z
    .string()
    .nonempty("direccion-es-requerida"),
  postalCode: z
    .number()
    .min(1, 'codigo-postal-no-valido')
    .refine((value) => !validateRule({name: 'letter', value: String(value)}), "codigo-postal-no-valido")

});
