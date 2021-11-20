import React from "react";
import style from "./MeetupDetail.module.css";
import Image from "next/image";
const MeetupDetail = (props) => {
  return (
    <section className={style.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;
