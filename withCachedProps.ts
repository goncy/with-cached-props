import type { NextPageContext } from 'next';
import { kv } from '@vercel/kv';

/**
 * Higher-order function that wraps a getInitialProps function to add caching functionality
 * using Vercel KV store. The cache key is composed of the path, query parameters,
 * and cookies to ensure unique caching per user context.
 *
 * @param handler Original getInitialProps function to be wrapped
 * @returns Enhanced getInitialProps function with caching
 */
export default function withCachedProps<P>(
  handler: (context: NextPageContext) => Promise<P>
) {
  return async (context: NextPageContext): Promise<P> => {
    // Only apply caching on server-side
    if (typeof window === 'undefined') {
      // Extract relevant data from context to create a unique cache key
      const { asPath, query, req } = context;
      const cacheKey = `${asPath}-${JSON.stringify(query)}-${req.headers.cookie}`;

      // Try to fetch cached props from KV store
      const cachedProps = await kv.get(cacheKey);
      
      // If cached data exists, return it immediately
      if (cachedProps) {
        console.info('Cache hit for', cacheKey);

        return cachedProps as P;
      }
      
      console.info('Cache miss for', cacheKey);

      // If no cached data, execute original getProps
      const props = await handler(context);

      // Cache the result for 10 seconds
      await kv.set(cacheKey, props, { ex: 10 });

      return props;
    }

    // On client-side, just execute the original function without caching
    return handler(context);
  };
}