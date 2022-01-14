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
        <div>Activity page -1</div>
        <div>
          {this.state.activityData.map((element) => {
            return (
              <Link to={`/personality?activity=${element}`} >
                <button className="activity__button">{element}</button>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
