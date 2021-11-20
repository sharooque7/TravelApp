import { MongoClient, ObjectId } from "mongodb";
import React from "react";
import MeetupDetail from "../../../components/meetups/MeetupDetail";
import Head from "next/head";
import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";

const index = (props) => {
  const router = useRouter();
  const ISSERVER = typeof window === "undefined";
  let token = "";
  if (!ISSERVER) {
    // Access localStorage
    token = localStorage.getItem("token");
    console.log(token);
  }
  if (token === null) {
    router.push("/login");
  }
  return (
    <Layout>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.title} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Layout>
  );
};

export async function getStaticPaths() {
  try {
    const meetupItem = await helper("list");

    return {
      fallback: "blocking",
      paths: meetupItem.map((m) => ({
        params: { meetupId: m._id.toString() },
      })),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps(context) {
  const id = context.params.meetupId;
  //const query = context.query.token;
  console.log(context);
  try {
    const meetupItem = await helper("single", id);
    return {
      props: {
        meetupData: {
          id: meetupItem._id.toString(),
          title: meetupItem.title,
          description: meetupItem.description,
          image: meetupItem.image,
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
}
///helper funtion
const helper = async (path, id) => {
  let conn = "";
  try {
    conn = await MongoClient.connect(process.env.MONGO_URL);
    const db = await conn.db();

    const meetupColection = await db.collection("meetup");
    const meetupItem =
      path === "list"
        ? await meetupColection.find({}, { _id: 1 }).toArray()
        : await meetupColection.findOne({ _id: ObjectId(id) });

    // console.log(meetupItem);
    return meetupItem;
  } catch (error) {
    console.log(error);
    throw new Error(error, "Something went wrong");
  } finally {
    conn.close();
  }
};
export default index;
