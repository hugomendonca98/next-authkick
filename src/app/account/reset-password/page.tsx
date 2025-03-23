import { ResetPassword } from '@/components/reset-password/reset-password'

import React from 'react'

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const token = (await searchParams).filters

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <ResetPassword token={token} />
    </div>
  )
}
