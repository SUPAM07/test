import { z } from 'zod'

export const assistantRequestSchema = z.object({
  prompt: z.string().trim().min(1, 'prompt is required').max(2000),
  action: z.enum(['generate', 'rephrase', 'shorten', 'expand']).optional(),
  context: z.string().trim().max(500).optional(),
})
