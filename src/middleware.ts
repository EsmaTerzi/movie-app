import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Korumalı rotalar
const protectedRoutes = ['/profile', '/movies/create'];

// Public rotalar (giriş yapılmışsa erişilemez)
const authRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Korumalı rotalara erişim kontrolü
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Auth sayfalarına erişim kontrolü
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Token yoksa ve korumalı rotaya erişmeye çalışıyorsa login'e yönlendir
  if (isProtectedRoute && !token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Token varsa ve auth sayfasına gitmeye çalışıyorsa ana sayfaya yönlendir
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Middleware'in çalışacağı rotalar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
