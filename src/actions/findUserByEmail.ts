'use server'

import { db } from '@/lib/db/drizzle'

export async function findUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  })

  return user
}
