import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Personality.scss";

export default class Personality extends Component {
  constructor() {
    super();
    this.state = {
      personalityData: [],
      activity: null
    };
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const activity = urlParams.get("activity");

    this.setState ({ activity: activity})

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

  render() {
    return (
      <div className="personality">
        <div className="personality__title">Who are you?</div>
        <div className="personality__list">
          {this.state.personalityData.map((element) => {
            return (
              <Link
                to={`/schedule?activity=${this.state.activity}&personality=${element}`}
              >
                <button className="personality__button"><p className="personality__button-text">{element}</p></button>
              </Link>
            );
          })}
        </div>
        <button className="personality__submit">Continue > </button>

      </div>
    );
  }
}
