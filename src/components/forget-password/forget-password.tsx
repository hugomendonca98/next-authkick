'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { KeyRound, Loader2, Mail } from 'lucide-react'
import Link from 'next/link'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card'
import { Label } from '../ui/label'
import {
  type forgetPasswordFormData,
  forgetPasswordSchema,
} from './forget-password-schema'
import { forgetPassword } from '@/lib/auth-client'
import { findUserByEmail } from '@/actions/findUserByEmail'

export function ForgetPassword() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
  })

  const handleRecoveryPassword = async (email: string) => {
    const user = await findUserByEmail(email)

    if (!user) {
      toast.error('User not found')
      return
    }

    await forgetPassword({
      email,
      redirectTo: '/account/reset-password',
      fetchOptions: {
        onResponse: () => {
          setLoading(false)
        },
        onRequest: () => {
          setLoading(true)
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
        onSuccess: () => {
          toast.success('Password reset link sent to your email')
          router.push('/account/reset-password')
        },
      },
    })
  }

  const onSubmit = async (data: forgetPasswordFormData) => {
    handleRecoveryPassword(data.email)
  }

  return (
    <div className="flex w-full items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl pt-0">
        <CardHeader className="space-y-1 bg-gradient-to-r from-slate-50 to-slate-100 pb-6 pt-8 dark:from-slate-900 dark:to-slate-800">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Enter your email and we&apos;ll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="pl-10"
                    {...register('email', { required: true })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full transition-all duration-300 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center border-t bg-muted/20 px-8 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Remembered your password?{' '}
            <Link
              href="/account/signin"
              className="font-medium text-primary hover:underline"
            >
              Back to login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
