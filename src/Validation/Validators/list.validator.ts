import { z } from "zod";

export const listValidatorSchema = z.object({
  name: z
  .string()
  .nonempty("nombre-es-requerido"),
  visibility: z
    .string()
    .nonempty("debe-seleccionar-visibilidad"),
    description: z
    .string()
    .nonempty("descripcion-es-requerida"),

});
