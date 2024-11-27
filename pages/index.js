import withCachedProps from '../withCachedProps';

function HomePage({ path, query, cookies, timestamp }) {
  return (
    <div>
      <h1>Home</h1>
      <p>url: {path}</p>
      <p>query: {JSON.stringify(query)}</p>
      <p>cookies: {JSON.stringify(cookies)}</p>
      <p>timestamp: {timestamp}</p>
    </div>
  )
}

HomePage.getInitialProps = withCachedProps(async (context) => {
  const timestamp = new Date().toISOString();
    
  return {
    path: context.asPath,
    query: context.query,
    cookies: context.req?.cookies || {},
    timestamp,
  };
});

export default HomePage;
