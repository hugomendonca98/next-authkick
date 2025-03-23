import { getSession } from '@/actions/getSession'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const session = await getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
