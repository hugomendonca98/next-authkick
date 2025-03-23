import { z } from 'zod'

export const resetPasswordSchema = z.object({
  newPassword: z.string().nonempty('New password is required'),
  token: z.string().nonempty('Token is required'),
})

export type resetPasswordFormData = z.infer<typeof resetPasswordSchema>
