import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Fast gate for /staff: cookie presence only. Session is validated in RSC layouts. */
function hasStaffSessionCookie(request: NextRequest) {
  const names = [
    'better-auth.session_token',
    '__Secure-better-auth.session_token',
    'better-auth.session_data',
    '__Secure-better-auth.session_data',
  ];
  return names.some((name) => Boolean(request.cookies.get(name)?.value));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/staff')) {
    if (pathname === '/staff/login') {
      return NextResponse.next();
    }

    if (!hasStaffSessionCookie(request)) {
      const url = request.nextUrl.clone();
      url.pathname = '/staff/login';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('locale', 'fr');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/staff", "/staff/:path*", "/fr", "/fr/:path*"],
};
