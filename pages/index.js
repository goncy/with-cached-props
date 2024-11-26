import withCachedProps from '../withCachedProps';

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

export const getServerSideProps = withCachedProps(async (context) => {
  const timestamp = new Date().toISOString();

  return {
    props: {
      url: context.resolvedUrl,
      query: context.query,
      cookies: context.req.cookies,
      timestamp,
    }
  };
});
