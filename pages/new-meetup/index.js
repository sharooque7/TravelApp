import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHanlder = async (data) => {
    //console.log(data);

    const ISSERVER = typeof window === "undefined";
    let token = "";
    if (!ISSERVER) {
      // Access localStorage
      token = localStorage.getItem("token");
      //console.log(token);
    }

    const response = await axios({
      method: "POST",
      url: "/api/new-meetup",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    //console.log(response);
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
      <NewMeetupForm onAddMeetup={addMeetupHanlder} />
    </Layout>
  );
};

export default NewMeetupPage;
