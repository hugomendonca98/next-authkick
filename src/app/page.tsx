import { getSession } from '@/actions/getSession'
import { SignIn } from '@/components/sign-in'
import { redirect } from 'next/navigation'

export default async function Home() {
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
