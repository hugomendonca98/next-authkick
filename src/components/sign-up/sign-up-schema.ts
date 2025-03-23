import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z
      .string()
      .regex(/^[A-Za-z]+$/i, 'Only letters are allowed')
      .nonempty('Name is required'),
    email: z.string().nonempty('Email is required').email('Invalid email'),
    password: z.string().nonempty('Password is required'),
    confirm_password: z.string().nonempty('Confirm password is required'),
  })
  .refine(
    ({ password, confirm_password: confirmPassword }) =>
      password === confirmPassword,
    {
      message: "Password doesn't match",
      path: ['confirm_password'],
    },
  )

export type signUpFormData = z.infer<typeof signUpSchema>
