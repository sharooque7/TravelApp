import EditTraveForm from "../../components/meetups/EditTraveForm";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/layout/Layout";

const NewMeetupPage = (props) => {
  const router = useRouter();
  const id = router.query.id;
  const ISSERVER = typeof window === "undefined";
  let token = "";
  if (!ISSERVER) {
    // Access localStorage
    token = localStorage.getItem("token");
    console.log(token);
  }

  const addMeetupHanlder = async (data) => {
    console.log(data);

    const response = await axios({
      method: "PUT",
      url: "/api/edit",
      data: data,
      headers: { Authorization: "Bearer " + token },
    });

    console.log(response);
    router.push("/homepage");
  };
  return (
    <Layout>
      <Head>
        <title>Add New Meetups</title>
        <meta
          name="description"
          content="Add your own place for others to see"
        ></meta>
      </Head>
      <EditTraveForm onAddMeetup={addMeetupHanlder} id={id} />
    </Layout>
  );
};

export default NewMeetupPage;
