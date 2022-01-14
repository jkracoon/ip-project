import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Confirmation.scss";
import B1 from "../../assets/images/image.png";
import B2 from "../../assets/images/image (1).png";

class Confirmation extends Component {
  // componentDidMount() {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const activity = urlParams.get("activity");
  //   const personality = urlParams.get("personality");
  //   const date = urlParams.get("date");

  //   axios.get(
  //     `/schedule?activity=${this.state.activity}&&personality=${this.state.buttonValue}`
  //   );
  // }
  handleClick = () => {
    this.props.history.goBack()
  };
  render() {
    return (
      <div className="confirmation-wrapper">
        <div className="main-container">
          <div className="outer-container">           
            <div className="inner-container">
              <h1>January</h1>                         
              <div>Monday 17, 2022</div>
              <div>11:00am</div>

            </div>
            <div className="img-container"></div>
          </div>
            <img src={B1} className="background__one" alt="background" />
            <img src={B2} className="background__two" alt="background" />

          <div className="btn-container">
            <div className="back-btn">
              <p className="back-btn__text">  Go Back </p>
            </div>
            <button className="confirm-btn">Confirm</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirmation;
