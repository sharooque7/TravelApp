import Head from "next/head";

import Signup from "../components/signin/Signin";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Simple Travel Data App. Login to add your place"
        ></meta>
      </Head>
      <Signup />
    </>
  );
};

export default HomePage;
