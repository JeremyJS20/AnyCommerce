import { z } from "zod";
import { validateRule } from "../Rules/Rules";

export const paymentMethodValidatorSchema = z.object({
  cardName: z.string().nonempty("nombre-tarjeta-es-requerido"),
  cardNumber: z
    .string()
    .nonempty("numero-tarjeta-es-requerido")
    .refine(
      (value) => validateRule({ name: "cardNumber", value: String(value) }),
      "tarjeta-no-valida"
    ),
  expirationDate: z
    .string()
    .nonempty("fecha-expiracion-es-requerida")
    .refine(
      (value) => validateRule({ name: "cardExpDate", value: String(value) }),
      "fecha-expiracion-no-valida"
    ),
  securityCode: z
    .string()
    .nonempty("codigo-seguridad-es-requerido")
    .refine(
      (value) => validateRule({ name: 'cardCcv', value: String(value) }),
      "codigo-seguridad-no-valido"
    ),
});
