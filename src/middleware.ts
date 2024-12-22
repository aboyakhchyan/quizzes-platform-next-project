import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { IUser } from './app/_helpers/types'
import { jwtDecode } from 'jwt-decode'

const protectedRoutes = [
  /^\/scores-test\/[^/]+$/,
  /^\/result-test\/[^/]+\/[^/]+$/,
  /^\/pass-test\/[^/]+$/,
  /^\/add-test$/,
]

const publicRoutes = ['/login-page', '/register-page', '/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.some((route) => route.test(path))
  const isPublicRoute = publicRoutes.includes(path)

  const token = (await cookies()).get('auth')?.value as string

  let user = null

  if (token) {
    user = await jwtDecode(token) as IUser
  }

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login-page', req.nextUrl))
  }

  if (isPublicRoute && user && !req.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/profile', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
