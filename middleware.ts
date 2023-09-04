import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PERMISSION_ROLES } from './constants';

const createUnauthorizedResponse = () => {
  return new Response(JSON.stringify({ message: 'Not authorized' }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const redirectTo = (url: string, req: NextRequest) => {
  const finalUrl = new URL(url, req.nextUrl.origin);
  return NextResponse.redirect(finalUrl);
};

export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;

  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    if (previousPage.startsWith('/api/admin'))
      return createUnauthorizedResponse();
    return redirectTo('/auth/login?p=' + previousPage, req);
  }

  if (
    (previousPage.startsWith('/admin') ||
      previousPage.startsWith('/api/admin')) &&
    !PERMISSION_ROLES.includes(session.user.role)
  ) {
    if (previousPage.startsWith('/api/admin'))
      return createUnauthorizedResponse();
    return redirectTo('/', req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};
