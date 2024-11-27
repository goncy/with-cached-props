import { GetStaticProps, InferGetStaticPropsType } from "next";

const HomePage:InferGetStaticPropsType<typeof getStaticProps> = ({ path, query, cookies, timestamp }) => {
  return (
    <div>
      <h1>Home</h1>
      <p>url: {path}</p>
      <p>query: {JSON.stringify(query, null, 2)}</p>
      <p>cookies: {JSON.stringify(cookies, null, 2)}</p>
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
      path: `/${params.cookies}/${params.query}`,
      query: JSON.parse(decodeURIComponent(params.query)),
      cookies: JSON.parse(decodeURIComponent(params.cookies)), 
      timestamp,
    },
  };
};

export default HomePage;