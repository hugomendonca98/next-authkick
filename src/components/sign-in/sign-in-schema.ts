import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email'),
  password: z.string().nonempty('Password is required'),
})

export type signInFormData = z.infer<typeof signInSchema>
