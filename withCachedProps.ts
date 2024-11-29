import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { kv } from '@vercel/kv';

/**
 * Higher-order function that wraps a getServerSideProps function to add caching functionality
 * using Vercel KV store. The cache key is composed of the resolved URL, query parameters,
 * and cookies to ensure unique caching per user context.
 *
 * @param gssp Original getServerSideProps function to be wrapped
 * @returns Enhanced getServerSideProps function with caching
 */
export default function withCachedProps<P extends { [key: string]: any }>(gssp: GetServerSideProps<P>): GetServerSideProps<P> {
  return async (context: GetServerSidePropsContext) => {
    // Extract relevant data from context to create a unique cache key
    const { resolvedUrl, query, req: {cookies} } = context;
    const cacheKey = `${resolvedUrl}-${JSON.stringify(query)}-${JSON.stringify(cookies)}`;

    // Try to fetch cached props from KV store
    const cachedProps = await kv.get(cacheKey);
    
    // If cached data exists, return it immediately
    if (cachedProps) {
      console.info('Cache hit for', cacheKey);

      return cachedProps as GetServerSidePropsResult<P>;
    }
    
    console.info('Cache miss for', cacheKey);

    // If no cached data, execute original getServerSideProps
    const props = await gssp(context);

    // Cache the result for 10 seconds
    kv.set(cacheKey, props, { ex: 10 });

    return props;
  };
}