import MeetupList from "../../components/meetups/MeetupList";
import Head from "next/head";

import { MongoClient } from "mongodb";
import Layout from "../../components/layout/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";

const HomePage = (props) => {
  const router = useRouter();

  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDate");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setTimeout(() => {
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("token");
      router.push("/login");
    }, remainingMilliseconds);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Simple Travel Data App"></meta>
      </Head>

      <MeetupList meetups={props.data} />
    </Layout>
  );
};

export async function getStaticProps() {
  //Fetch Daat from here
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = await client.db();

  const meetusCollection = await db.collection("meetup");

  const meetups = await meetusCollection.find().toArray();

  client.close();

  console.log(meetups);

  return {
    props: {
      data: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
  };
}

export default HomePage;
