import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";

function MeetupItem(props) {
  if (process.browser) {
    const token = localStorage.getItem("token");
  }
  const [item, setItem] = useState(false);
  const [success, setsuccess] = useState(false);
  let status = { status: false, title: "", desc: "" };

  const [show, setShow] = useState(status);

  const handleClose = () => setShow({ status: false });

  const ISSERVER = typeof window === "undefined";
  let token = "";
  if (!ISSERVER) {
    // Access localStorage
    token = localStorage.getItem("token");
    console.log(token);
  }

  const router = useRouter();
  const handleRoutes = () => {
    router.push(`details/${props.id}`);
  };
  const deleteItem = async (id) => {
    try {
      const response = await axios({
        method: "DELETE",
        data: { id: id },
        url: `/api/delete/${id}`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(response["data"].Message);
      setShow({
        status: true,
        title: "Deleted Succesfully",
        desc: "The item deleted",
      });

      window.location.reload();
    } catch (error) {
      setShow({ status: true, title: "Deleted Failed", desc: "Please retry" });
    }
  };

  const editItem = async (item) => {
    router.push({ pathname: "/edit-places", query: { id: item.id } });
  };
  return (
    <li className={classes.item}>
      <Card>
        <Modal
          show={show.status}
          status={show.title}
          desc={show.desc}
          handleClose={handleClose}
        />
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRoutes}>Show Details</button>
          <button
            onClick={() => {
              editItem(props);
            }}
          >
            Edit Item
          </button>
          <button
            onClick={() => {
              deleteItem(props.id);
            }}
          >
            Delete Item
          </button>
        </div>
        {item ? <p className={classes.notifyFailed}>Delete faied</p> : null}
        {success ? (
          <p className={classes.notifySuccess}>Delete success</p>
        ) : null}
      </Card>
    </li>
  );
}

export default MeetupItem;
