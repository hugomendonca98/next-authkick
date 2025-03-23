import { HydrateClient } from '@/lib/trpc/server'

export default async function Home() {
  return (
    <HydrateClient>
      <div>
        <h1>Home</h1>
      </div>
    </HydrateClient>
  )
}
