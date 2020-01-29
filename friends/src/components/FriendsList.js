import React, { Component } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

// components
import FriendForm from "./FriendForm";

class FriendsList extends Component {
  state = {
    friendsList: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // This code fetches the initial data - but it's protected, so we must use axiosWithAuth to send the token on the header of the request
    axiosWithAuth()
      .get("/api/friends")
      .then(res => {
        this.setState({
          friendsList: res.data
        });
        console.log("This is axiosWithAuth.get.then: ", res);
      })
      .catch(err => console.log("This is axiosWithAuth.get.catch: ", err));
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Welcome to your friends list!</h1>
          <FriendForm />
          {this.state.friendsList.map(friend => (
            <p key={friend.id}>{friend.name}</p>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default FriendsList;
