import React, { Component } from "react";
import Header from '../../common/header/Header';
import {Redirect} from "react-router-dom";
import { Typography } from '@material-ui/core';

class Profile extends Component {

    constructor() {
        super()
        this.state = {
            restaurant: [],
            isSearchOn: false,
        }
    }

    componentWillMount() {
        if (
            sessionStorage.getItem("access-token") === null ||
            sessionStorage.getItem("access-token") === "null"
        ) {
            this.props.history.push({
                pathname: "/",
            });
        } else{
            this.setState({
                ...this.state,
                isLoggedIn: true,
            })
        }
    }

    /* Logout action from Drop Down Menu on Profile Page */
    redirectToHome = () => {
        if (!this.state.isLoggedIn) {
            return <Redirect to="/" />
        }
    }

    logoutRedirectToHome = () => {
        this.setState({
            ...this.state,
            isLoggedIn: false,
        })
    }

    render() {
        return (
            <div>
                {this.redirectToHome()}
                <Header baseUrl={this.props.baseUrl} showHeaderSearchBox={false} logoutRedirect={this.logoutRedirectToHome}/>
                <div className="flex-container" >
                    <Typography variant="h4" component="h4">Profile Page</Typography>
                </div>
            </div>
        );
    }
}

export default Profile;