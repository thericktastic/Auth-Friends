import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: ""
    },
    isLoading: false
  };

  // This handleChange sets state for this.state.credentials by spreading in the current value for this.state.credentials and then watching the two inputs (username and password) in the render() below
  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    this.setState({
      isLoading: true
    });
    console.log("This is this.state.isLoading: ", this.state.isLoading);
    // We need to make a POST request to the server
    // The server will "authenticate" the user based on the credentials provided by the user
    // If the user can be authenticated, the server will return a token
    // [POST] to `/api/login`: returns a token to be added to the header of all other requests. Pass in the following credentials as the `body` of the request: `{ username: 'lambda', password: 'school' }`
    axios
      .post("http://localhost:5000/api/login", this.state.credentials)
      .then(res => {
        // The token won't always reside in res.data.payload
        // The location of the token must be tracked down before we can place it in localStorage
        console.log("This is axios.post.then: ", res);
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => console.log("This is axios.post.catch: ", err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login} className="login-form">
          <input
            type="text"
            name="username"
            label="Username"
            placeholder="Username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
        {this.state.isLoading && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={2000} //2 secs
          />
        )}
      </div>
    );
  }
}

export default Login;
