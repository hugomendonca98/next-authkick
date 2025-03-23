'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  resetPasswordFormData,
  resetPasswordSchema,
} from './reset-password-schema'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Label } from '@radix-ui/react-label'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { resetPassword } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Props = {
  token?: string | string[]
}

export function ResetPassword({ token }: Props) {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: resetPasswordFormData) => {
    await resetPassword({
      newPassword: data.newPassword,
      token: data.token,
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
          router.push('/account/signin')
        },
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your new password and token to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="token">Token</Label>
              <Input
                id="token"
                type="text"
                placeholder="Token"
                defaultValue={token || ''}
                {...register('token', { required: true })}
              />
              {errors.token && (
                <span className="text-xs text-red-600">
                  {errors.token.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="text"
                placeholder="New Password"
                {...register('newPassword', { required: true })}
              />
              {errors.newPassword && (
                <span className="text-xs text-red-600">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                'Reset Password'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
