import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Activity.scss";

export default class Activity extends Component {
  constructor() {
    super();
    this.state = {
      activityData: [],
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

  render() {
    return (
      <div className="activity">
        <div className="activity__title">What would you like to do?</div>
        <div className="activity__list">
          {this.state.activityData.map((element) => {
            return (
              <Link to={`/personality?activity=${element}`}>
                <button className="activity__button">
                  <p className="activity__button-text">{element}</p>
                </button>
              </Link>
            );
          })}
        </div>
        <button className="activity__submit">Get Started > </button>
      </div>
    );
  }
}
