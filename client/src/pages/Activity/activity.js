import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Activity.scss'

export default class Activity extends Component {
    constructor() {
        super();
        this.state = {
            activityData: null,
        };
    }

    getActivityData = () => {
        axios
        .get()
        .then((res) => {
            this.setState( { activityData: res.data })
        })
        .catch((e) => {
            console.error(e);
            alert('something went wrong');
        });
    };


    render() {
        return (
            <div>
                Activity page
            </div>
        )
    }
}
