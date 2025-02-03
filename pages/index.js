export default function HomePage({ url, query, cookies, timestamp }) {
  return (
    <div>
      <h1>Home</h1>
      <p>url: {url}</p>
      <p>query: {JSON.stringify(query)}</p>
      <p>cookies: {JSON.stringify(cookies)}</p>
      <p>timestamp: {timestamp}</p>
    </div>
  )
}

export const getServerSideProps = context => {
  // Set the Vary header to include the Cookie header
  context.res.setHeader('Vary', 'Cookie');

  // Set the Cache-Control header to cache the response for 10 seconds
  context.res.setHeader('Cache-Control', 's-maxage=60');


  // Get the timestamp to ensure the response is cached
  const timestamp = new Date().toISOString();

  return {
    props: {
      url: context.resolvedUrl,
      query: context.query,
      cookies: context.req.cookies,
      timestamp,
    }
  };
};
