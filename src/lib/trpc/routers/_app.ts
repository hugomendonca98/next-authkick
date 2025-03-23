import { createTRPCRouter } from '../init'
import { passwordRouter } from './forget-password'

export const appRouter = createTRPCRouter({
  forgetPassword: passwordRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
