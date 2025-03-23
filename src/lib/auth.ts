import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/lib/db/drizzle'
import * as schema from '@/lib/db/schema'
import { trpc } from './trpc/server'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  plugins: [nextCookies()],
  advanced: {
    generateId: false, // disable default id generation.
    cookiePrefix: 'myapp',
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    async sendResetPassword(data, _request) {
      // Send an email to the user with a link to reset their password
      await trpc.forgetPassword.post({
        url: data.url,
        token: data.token,
        email: data.user.email,
      })
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    modelName: 'users',
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
        input: false, // don't allow user to set role
      },
      deletedAt: {
        type: 'string',
        required: false,
        defaultValue: null,
        // input: false, // don't allow user to set role
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    freshAge: 60 * 60 * 24, // 1 day (the session is fresh if created within the last 1 day)
    modelName: 'sessions',
    additionalFields: {
      deletedAt: {
        type: 'string',
        required: false,
        defaultValue: null,
        // input: false, // don't allow user to set role
      },
    },
  },
  account: {
    modelName: 'accounts',
    additionalFields: {
      deletedAt: {
        type: 'string',
        required: false,
        defaultValue: null,
        // input: false, // don't allow user to set role
      },
    },
  },
  verification: {
    modelName: 'verifications',
  },
})
