import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().nonempty('New password is required'),
    confirmPassword: z.string().nonempty('Confirm password is required'),
    token: z.string().nonempty('Token is required'),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: "Password doesn't match",
      path: ['confirmPassword'],
    },
  )

export type resetPasswordFormData = z.infer<typeof resetPasswordSchema>
