import { z } from 'zod'

export const forgetPasswordSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email'),
})

export type forgetPasswordFormData = z.infer<typeof forgetPasswordSchema>
