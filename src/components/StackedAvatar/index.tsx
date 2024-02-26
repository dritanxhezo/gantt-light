import React from "react";
import "./stacked-avatars.scss";

const Avatars = (props: any) => {
  return (
    <div className="avatars">
      <a href="#" className="avatars__item">
        <img
          className="avatar"
          src="https://randomuser.me/api/portraits/women/65.jpg"
          alt=""
        />
      </a>
      <a href="#" className="avatars__item">
        <img
          className="avatar"
          src="https://randomuser.me/api/portraits/men/25.jpg"
          alt=""
        />
      </a>
      <a href="#" className="avatars__item">
        <img
          className="avatar"
          src="https://randomuser.me/api/portraits/women/25.jpg"
          alt=""
        />
      </a>
      <a href="#" className="avatars__item">
        <img
          className="avatar"
          src="https://randomuser.me/api/portraits/men/55.jpg"
          alt=""
        />
      </a>
      <a href="#" className="avatars__item">
        <img
          className="avatar"
          src="https://via.placeholder.com/300/09f/fff.png"
          alt=""
        />
      </a>
    </div>
  );
};

export default Avatars;
