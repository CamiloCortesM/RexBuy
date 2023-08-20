import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const createUnauthorizedResponse = () => {
  return new Response(JSON.stringify({ message: 'Not authorized' }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;
  const validRoles = ['admin', 'employee'];

  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    if (previousPage.startsWith('/api/admin'))
      return createUnauthorizedResponse();
    const url = new URL('/auth/login', req.nextUrl.origin);
    url.search = `p=${previousPage}`;
    return NextResponse.redirect(url);
  }

  if (
    (previousPage.startsWith('/admin') ||
      previousPage.startsWith('/api/admin')) &&
    !validRoles.includes(session.user.role)
  ) {
    if (previousPage.startsWith('/api/admin'))
      return createUnauthorizedResponse();
    const url = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};
