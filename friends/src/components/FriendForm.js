import React, { Component } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

class FriendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: {
        name: "",
        age: null,
        email: ""
      }
    };
  }

  handleChanges = e => {
    this.setState({
      friend: {
        ...this.state.friend,
        [e.target.name]: e.target.value
      }
    });
  };

  postFriend = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/friends", this.state.friend)
      .then(res => {
        this.props.history.push("/protected");
        console.log("This is res in putfriend(): ", res);
      })
      .catch(err => console.log("This is err in putFriend(): ", err));
  };

  render() {
    console.log("This is this.state.friend in render(): ", this.state.friend);
    return (
      <form onSubmit={this.postFriend}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.handleChanges}
            value={this.state.friend.name}
          />
        </div>
        <div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={this.handleChanges}
            value={this.state.friend.age}
          />
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.handleChanges}
            value={this.state.friend.email}
          />
        </div>
        <button type="submit">Add Friend</button>
      </form>
    );
  }
}

export default FriendForm;
