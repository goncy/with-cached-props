import withCachedProps from '../withCachedProps';

function HomePage({ url, query, cookies, timestamp }) {
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

HomePage.getInitialProps = withCachedProps(async (context) => {
  const timestamp = new Date().toISOString();
    
  return {
    url: context.asPath,
    query: context.query,
    cookies: context.req?.cookies || {},
    timestamp,
  };
});

export default HomePage;
