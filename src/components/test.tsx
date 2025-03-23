'use client'
// <-- hooks can only be used in client components
import { trpc } from '@/lib/trpc/client'
export function ClientGreeting() {
  const greeting = trpc.hello.useQuery({
    text: 'Hugo',
  })
  if (!greeting.data) return <div>Loading...</div>
  return <div>{greeting.data.greeting}</div>
}
