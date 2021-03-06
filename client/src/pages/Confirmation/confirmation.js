import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Confirmation.scss";
import B1 from "../../assets/images/image.png";
import B2 from "../../assets/images/image (1).png";

function confirmation(props) {
  console.log(props.history.location.state);

  const { month, date, day, year, selectedTime } = props.history.location.state;
  return (
    <div className="confirmation-wrapper">
      <div className="main-container">
        <div className="outer-container">
          <div className="inner-container">
            <h1>{month}</h1>
            <div>
              {day} {date}, {year}
            </div>
            <div>{selectedTime}</div>
          </div>
          <div className="img-container"></div>
        </div>
        <img src={B1} className="background__one" alt="background" />
        <img src={B2} className="background__two" alt="background" />

        <div className="btn-container">
          <div className="back-btn">
            <p className="back-btn__text">
              <Link id="goback" to="/">
                Go Back
              </Link>
            </p>
          </div>
          <button className="confirm-btn">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default confirmation;
