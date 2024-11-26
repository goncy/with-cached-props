import { GetStaticProps, InferGetStaticPropsType } from "next";

const HomePage:InferGetStaticPropsType<typeof getStaticProps> = ({ url, query, cookies, timestamp }) => {
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

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: { cookies: string; query: string };
}) => {
  const timestamp = new Date().toISOString();

  return {
    revalidate: 10,
    props: {
      url: `/${params.cookies}/${params.query}`,
      query: JSON.parse(params.query.replace('query-', '')),
      cookies: JSON.parse(params.cookies.replace('cookies-', '')), 
      timestamp,
    },
  };
};

export default HomePage;