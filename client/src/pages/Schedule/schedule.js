import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Schedule.scss";

class Schedule extends Component {
  state = {
    selectedTime: "",
    data: [],
    day: "",
    month: "",
    year: "",
    date: "",
    className: ["active", "active", "active", "active", "active", "active"],
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
    let date = newDate.getDate();
    let day = days[newDate.getDay()];
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();
    this.setState({
      day: day,
      month: month,
      year: year,
      date: date,
    });
  };

  // handleClick = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     selectedTime: e.target.value,
  //   });
  //   return e.target.value;
  // };

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const activity = urlParams.get("activity");
    const personality = urlParams.get("personality");

    // dummie data
    // const activity = "Lunch";
    // const personality = "Sporty";
    this.setDate();
    axios
      .get(
        `http://localhost:8080/schedule?activity=${activity}&&personality=${personality}`
      )
      .then((result) => {
        console.log(result);
        this.setState({
          data: result.data.date,
        });
      })
      .catch((err) => console.log(err));
    const sampleArr = [...new Set(this.state.data)];
    const getStateArr = (sampleArr, stateArr) => {
      for (let i = 0; i < sampleArr.length; i++) {
        stateArr.splice(i, 1, "active");
      }
    };
    getStateArr(sampleArr, this.state.className);
  }

  // componentDidUpdate(){
  //   const filteredData=this.state.data.filter(element=>{
  //     const timeSlot = this.handleClick();
  //     element.date === timeSlot;
  //   })
  // }

  render() {
    console.log(this.state.data);
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
              value={"9:00 pm"}
              className={this.state.className[0]}
              // onClick={this.handleClick}
            >
              9:00 am
            </button>
            <button
              value={"10:00 pm"}
              className={this.state.className[1]}
              // onClick={this.handleClick}
            >
              10:00 am
            </button>
            <button
              value={"11:00 pm"}
              className={this.state.className[2]}
              // onClick={this.handleClick}
            >
              11:00 am
            </button>
            <button
              value={"12:00 pm"}
              className={this.state.className[3]}
              // onClick={this.handleClick}
            >
              12:00 pm
            </button>
            <button
              value={"1:00 pm"}
              className={this.state.className[4]}
              // onClick={this.handleClick}
            >
              1:00 pm
            </button>
            <button
              value={"2:00 pm"}
              className={this.state.className[5]}
              // onClick={this.handleClick}
            >
              2:00 pm
            </button>
          </div>
        </div>
        <Link to="/confirmation">
          <div className="schedule-continue-btn">Continue ></div>
        </Link>
      </div>
    );
  }
}

export default Schedule;
