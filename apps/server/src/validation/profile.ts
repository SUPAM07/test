import { z } from 'zod'

export const profileQuerySchema = z.object({
  includePreferences: z
    .union([z.literal('true'), z.literal('false')])
    .optional()
    .transform((value) => value !== 'false'),
})
