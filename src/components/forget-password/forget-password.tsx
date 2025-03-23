'use client'

import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  forgetPasswordFormData,
  forgetPasswordSchema,
} from './forget-password-schema'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card'
import { Label } from '../ui/label'
import { forgetPassword } from '@/lib/auth-client'
import { toast } from 'sonner'
import { findUserByEmail } from '@/actions/findUserByEmail'
import { useRouter } from 'next/navigation'

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
          toast.success('Password reset successfully')
          router.push('/account/reset-password')
        },
      },
    })
  }

  const onSubmit = async (data: forgetPasswordFormData) => {
    handleRecoveryPassword(data.email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Forgot your password?
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <span className="text-xs text-red-600">
                  {errors.email.message}
                </span>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                'Send reset link'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
