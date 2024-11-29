import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}

const ALLOWED_SEARCH_PARAMS = ['page', 'limit', 'sort', 'order'];

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check if the request has only allowed search params
  const hasOnlyAllowedParams = Array.from(request.nextUrl.searchParams.keys()).every(key => ALLOWED_SEARCH_PARAMS.includes(key));

  // If no params or only allowed params, cache the response for 60 seconds, otherwise don't cache
  const cacheControl = hasOnlyAllowedParams ? 'public, s-maxage=60' : 'no-store';

  // Tell the browser to not cache the response
  response.headers.set('cache-control', 'private, no-cache, no-store, max-age=0, must-revalidate');

  // Tell the CDN to cache the response
  response.headers.set('cdn-cache-control', cacheControl);

  // Tell the client if the response was cached (just for debugging)
  response.headers.set('x-cached', hasOnlyAllowedParams ? 'true' : 'false');

  return response;
}