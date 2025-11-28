  import { z } from 'zod'

  export const CustomerSchema = {
    create: z.object({
      name: z
        .string()
        .min(5, { message: 'El nombre debe tener al menos 5 caracteres' })
        .max(20, { message: 'El nombre no puede superar los 20 caracteres' }),
      quantitySuccess: z.number().min(0, { message: 'El valor debe ser igual o mayor a 0' }),
      quantityFailed: z.number().min(0, { message: 'El valor debe ser igual o mayor a 0' }),
    }),
  }
