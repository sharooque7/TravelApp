import { useRef, useEffect } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import axios from "axios";

function NewMeetupForm(props) {
  console.log(props);
  const id = props.id;
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const ISSERVER = typeof window === "undefined";
  let token = "";
  if (!ISSERVER) {
    // Access localStorage
    token = localStorage.getItem("token");
    console.log(token);
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios({
          method: "POST",
          url: "/api/edit",
          data: { id },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = res["data"].meetupItem;
        console.log(res["data"].meetupItem);
        titleInputRef.current.value = data.title;
        imageInputRef.current.value = data.image;
        addressInputRef.current.value = data.address;
        descriptionInputRef.current.value = data.description;
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id, token]);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      id: id,
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Destination Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Destination Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Destination Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Destination Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
