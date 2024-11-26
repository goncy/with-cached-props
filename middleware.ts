import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}

export default async function middleware(request: NextRequest) {
  const cookiesKey = `cookies-${JSON.stringify(request.cookies.getAll())}`;
  const queryKey = `query-${JSON.stringify(Array.from(request.nextUrl.searchParams.entries()))}`;

  request.nextUrl.pathname = `/${cookiesKey}/${queryKey}${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl);
}