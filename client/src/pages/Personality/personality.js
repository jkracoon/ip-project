import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Personality.scss";

export default class Personality extends Component {
  constructor() {
    super();
    this.state = {
      personalityData: [],
      activity: null,
      buttonValue: null,
    };
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const activity = urlParams.get("activity");

    this.setState({ activity: activity });

    console.log(activity);

    axios
      .get(`http://localhost:8080/personality?activity=${activity}`)
      .then((res) => {
        this.setState({ personalityData: res.data });
      })
      .catch((e) => {
        console.error(e);
        alert("something went wrong");
      });
  }

  personalityTarget = (e) => {
    e.preventDefault();
    const buttonValue = e.target.value;
    this.setState({ buttonValue: e.target.value });
    console.log(buttonValue);
  };

  render() {
    return (
      <div className="personality">
        <div className="personality__title">Who are you?</div>
        <div className="personality__list">
          {this.state.personalityData.map((element) => {
            return (
              <button
                className="personality__button"
                value={element}
                type="button"
                onClick={this.personalityTarget}
              >
                {element}
              </button>
            );
          })}
        </div>
        <button className="personality__submit">
          <Link
            to={`/schedule?activity=${this.state.activity}&&personality=${this.state.buttonValue}`}
          >
            Continue >
          </Link>
        </button>
      </div>
    );
  }
}
