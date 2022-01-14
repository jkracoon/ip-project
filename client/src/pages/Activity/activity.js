import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Activity.scss";

export default class Activity extends Component {
  constructor() {
    super();
    this.state = {
      activityData: [],
      buttonValue: null
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8080/activity`)
      .then((res) => {
        this.setState({ activityData: res.data });
      })
      .catch((e) => {
        console.error(e);
        alert("something went wrong");
      });
  }

  activityTarget = (e) => {
    const buttonValue = e.target.value
    this.setState({ buttonValue: e.target.value})
    console.log(buttonValue)
  }

  render() {
    return (
      <div className="activity">
        <div className="activity__title">What would you like to do?</div>
        <div className="activity__list">
          {this.state.activityData.map((element) => {
            return (
              <button
                className="activity__button"
                id="buttonValue"
                value={element}
                type="button"
                onClick={this.activityTarget}
              >
                <p className="activity__button-text">{element}</p>
              </button>
            );
          })}
        </div>
        <Link to={`/personality?activity=${this.state.buttonValue}`}>
          <div className="activity__submit">Get Started > </div>
        </Link>
      </div>
    );
  }
}
