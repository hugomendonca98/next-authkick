'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  RefreshCw,
} from 'lucide-react'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Label } from '../ui/label' // Fixed import from UI components
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  type resetPasswordFormData,
  resetPasswordSchema,
} from './reset-password-schema'
import { resetPassword } from '@/lib/auth-client'

type Props = {
  token?: string | string[]
}

export function ResetPassword({ token }: Props) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token?.toString() || '',
    },
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <div className="flex w-full items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-1 bg-gradient-to-r from-slate-50 to-slate-100 pb-6 pt-8 dark:from-slate-900 dark:to-slate-800">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <RefreshCw className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Create a new password for your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token" className="text-sm font-medium">
                  Reset Token
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="token"
                    type="text"
                    placeholder="Enter your reset token"
                    className="pl-10"
                    {...register('token', { required: true })}
                  />
                </div>
                {errors.token && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.token.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10"
                    autoComplete="new-password"
                    {...register('newPassword', { required: true })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
                {errors.newPassword && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirm-password"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10"
                    autoComplete="new-password"
                    {...register('confirmPassword', { required: true })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting password...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center border-t bg-muted/20 px-8 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{' '}
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
