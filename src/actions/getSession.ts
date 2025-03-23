'use server'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { Session, User } from 'better-auth/types'

type SessionType = {
  session: Session
  user: User
}

export async function getSession(): Promise<SessionType | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return session
}
