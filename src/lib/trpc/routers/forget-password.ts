import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '../init'
import { Resend } from 'resend'
import { RecoveryPasswordEmailTemplate } from '@/templates/recovery-password-email'
import { type ReactElement } from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

export const passwordRouter = createTRPCRouter({
  post: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        url: z.string().url(),
        token: z.string(),
      }),
    )
    .query(async (opts) => {
      const { data, error: _error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [opts.input.email],
        subject: 'next-authkick',
        react: RecoveryPasswordEmailTemplate({
          url: opts.input.url,
          token: opts.input.token,
        }) as ReactElement,
      })

      return { data }
    }),
})
