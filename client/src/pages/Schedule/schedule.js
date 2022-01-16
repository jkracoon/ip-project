import React, { Component, createRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Schedule.scss";
import continueSVG from "../../assets/images/continue.svg";

class Schedule extends Component {
  state = {
    resultData: [],
    selectedTime: null,
    data: [],
    day: "",
    month: "",
    year: "",
    date: "",
    className: [
      "in-active",
      "in-active",
      "in-active",
      "in-active",
      "in-active",
      "in-active",
    ],
  };
  // to get dates
  setDate = () => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      " July",
      "August",
      "September",
      " October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let newDate = new Date();
    let date = newDate.getDate() + 1;
    let day = days[newDate.getDay() + 1];
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();
    this.setState({
      day: day,
      month: month,
      year: year,
      date: date,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      selectedTime: e.target.value,
    });
    console.log(e.target.value);
  };

  getTimeArr = (arr) => {
    const timeArr = [];
    arr.forEach((element) => {
      timeArr.unshift(element.date);
    });
    return timeArr;
  };
  // to set classnames to active for available times
  setClassName = (arr, stateArr) => {
    const btnValues = [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
    ];
    arr.forEach((e) => {
      console.log(e);
      for (let i = 0; i < btnValues.length; i++) {
        console.log(btnValues[i]);
        if (btnValues[i] === e) {
          console.log(stateArr[i]);
          stateArr.splice(i, 1, "active");
          console.log(stateArr);
        }
      }
    });
    return stateArr;
  };

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const activity = urlParams.get("activity");
    const personality = urlParams.get("personality");

    this.setDate();
    axios
      .get(
        `http://localhost:8080/schedule?activity=${activity}&&personality=${personality}`
      )
      .then((result) => {
        console.log(result.data);

        this.setState({
          resultData: result.data,
          data: [...new Set(this.getTimeArr(result.data))],
          className: this.setClassName(
            [...new Set(this.getTimeArr(result.data))],
            this.state.className
          ),
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log("render", this.state.className);
    if (!this.state.resultData.length) {
      return <p>Loading...</p>;
    }

    return (
      <div className="schedule-container">
        <h1 className="schedule-title">When works for you?</h1>

        <div className="schedule-date-btn-container">
          <div className="schedule-date-container">
            <div className="schedule-month">{this.state.month}</div>
            <div className="schedule-date-flex">
              <div className="schedule-day">{this.state.day}</div>
              <div className="schedule-date">{this.state.date},</div>
              <div className="schedule-year">{this.state.year}</div>
            </div>
          </div>
          <div className="schedule-btn-container">
            <button
              name="btn1"
              value={"9:00 AM"}
              className={this.state.className[0]}
              onClick={this.handleClick}
            >
              9:00 am
            </button>
            <button
              name="btn2"
              value={"10:00 AM"}
              className={this.state.className[1]}
              onClick={this.handleClick}
            >
              10:00 am
            </button>
            <button
              name="btn3"
              value={"11:00 AM"}
              className={this.state.className[2]}
              onClick={this.handleClick}
            >
              11:00 am
            </button>
            <button
              name="btn4"
              value={"12:00 PM"}
              className={this.state.className[3]}
              onClick={this.handleClick}
            >
              12:00 pm
            </button>
            <button
              name="btn5"
              value={"1:00 PM"}
              className={this.state.className[4]}
              onClick={this.handleClick}
            >
              1:00 pm
            </button>
            <button
              name="btn6"
              value={"2:00 PM"}
              className={this.state.className[5]}
              onClick={this.handleClick}
            >
              2:00 pm
            </button>
          </div>
        </div>
        <Link
          to={{
            pathname: "/confirmation",
            state: {
              month: this.state.month,
              date: this.state.date,
              day: this.state.day,
              year: this.state.year,
              selectedTime: this.state.selectedTime,
            },
          }}
        >
          <div className="schedule-continue-btn">
            <img src={continueSVG} alt="" />
          </div>
        </Link>
      </div>
    );
  }
}

export default Schedule;
