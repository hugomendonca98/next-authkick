import { getSession } from '@/actions/getSession'
import { SignIn } from '@/components/sign-in'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const session = await getSession()

  if (session) {
    return redirect('/dashboard')
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <SignIn />
    </div>
  )
}
