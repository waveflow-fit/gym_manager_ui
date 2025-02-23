import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ROUTE_URLS } from '@/common/appUrls';
import { EUserRole } from '@/common/constants';
import { getSession } from '@/components/SessionProvider/auth.utils';

// Role-based access
const protectedRoutes: Record<string, string[]> = {
  [ROUTE_URLS.trainees]: [EUserRole.TRAINER],
  [ROUTE_URLS.diet]: [EUserRole.TRAINER],
  [ROUTE_URLS.workout]: [EUserRole.TRAINER],
};

export const middleware = async (req: NextRequest) => {
  const { nextUrl } = req;
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) {
    return NextResponse.next(); // let the app handle from dashboard/layout file
  }

  const user = await getSession(token);
  if (!user?.role) {
    // No matter what route it goes it will always encounter user onboarding so let the app handle this as well
    return NextResponse.next();
  }
  // for protected routes
  if (
    protectedRoutes[nextUrl.pathname] &&
    !protectedRoutes[nextUrl.pathname].includes(user.role)
  ) {
    return NextResponse.redirect(new URL(ROUTE_URLS.dashboard, req.url)); // if the route doesn't have the right access
  }
  return NextResponse.next();
};

// this has to be a static file
export const config = {
  matcher: ['/dashboard/diet', '/dashboard/workout', '/dashboard/trainees'],
};
