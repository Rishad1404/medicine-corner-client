import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import AuthBackgroundShape from '@/assets/svg/auth-background-shape'
import LoginForm from '@/components/shadcn-studio/blocks/login-page-01/login-form'
import Image from 'next/image'
import Link from 'next/link'

const Login = () => {
  return (
    <div className='relative flex  items-center justify-center overflow-x-hidden px-4 py-20 mb-20 sm:px-6 lg:px-8'>
      <div className='absolute'>
        <AuthBackgroundShape />
      </div>

      <Card className='z-1 w-full border-1 shadow-md sm:max-w-lg'>
        <CardHeader className='gap-6 text-center flex flex-col items-center'>
          
          {/* Logo from Public Folder */}
          <Image
            src="/logo.png" 
            alt="Medicine Corner Logo" 
            className="h-16 object-contain"
            width={180}  
            height={48}
            priority
          />

          <div>
            <CardTitle className='mb-1.5 text-2xl'>Sign in to Medicine Corner</CardTitle>
            <CardDescription className='text-base'>
              Ship Faster and Focus on Growth.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className='space-y-4'>
            {/* Standard Login Form */}
            <LoginForm />

            <p className='text-muted-foreground text-center'>
              New on our platform?{' '}
              <a href='/register' className='text-card-foreground hover:underline'>
                Create an account
              </a>
            </p>

            <div className='flex items-center gap-4'>
              <Separator className='flex-1' />
              <p>or</p>
              <Separator className='flex-1' />
            </div>

            <Button variant="ghost" className="w-full" asChild>
              <Link href="#">
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
                Sign up with Google
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login