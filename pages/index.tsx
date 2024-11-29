import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const HomePage:InferGetServerSidePropsType<typeof getServerSideProps> = ({ timestamp, isCached }) => {
  return (
    <div>
      <h1>Home</h1>
      <p>timestamp: {timestamp}</p>
      <p>isCached: {isCached}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const timestamp = new Date().toISOString();

  return {
    props: {
      timestamp,
      isCached: req.headers['x-cached'],
    },
  };
};

export default HomePage;