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
        const activity = urlParams.get('activity');

        console.log(activity);
       
        // axios
        // .get(`http://localhost:8080/personality?activity=${activity}`)
    }   
        
    
    render() {
        return (
            <div>
                Personality page
            </div>
        )
    }
}
