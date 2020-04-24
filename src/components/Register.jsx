import React, { Component } from "react";
import { BrowserRouter as Link, Redirect, withRouter } from "react-router-dom";
import { register } from "../services/index";

export class Register extends Component {
  state = {
    gotoLogin: false,
    username: "",
    email: "",
    password: "",
    cPassword:""

  };

  redirectLogin = () => {
    this.setState({
      gotoLogin: true
    });
  };

  onChange = e => {
    debugger;
    this.setState({ [e.target.name]: e.target.value });
    // this.validateForm();
  };


  onSubmit = e => {
    debugger;
    e.preventDefault();

    const user = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    register(user).then(res => {
      if (res) {
        console.log(res);
        this.props.history.push(`/Login`);
      }
    });
  };
  render() {
    if (this.state.gotoLogin) {
      return <Redirect to="/Login" />;
    }
    return (
      <div>
        <section className="form form-register animated flipInX">
          <img src="../logo/logo.png" className="aligncenter logo" />
          <h2>Register Account</h2>
          <p className="valid">Valid. Please wait a moment.</p>
          <p className="error">
            Error. Please enter correct Username &amp; password.
          </p>
          <form className="loginbox" autocomplete="off" onSubmit={this.onSubmit}>
            <input placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.onChange}></input>
            <input placeholder="Email" type="email" name="email" value={this.state.email} onChange={this.onChange}></input>
            <input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.onChange}></input>
            <input
              placeholder="Confirm Password"
              type="password"
              name="cPassword"
            ></input>
            <button id="submit" type="submit">Register</button>
          </form>
          <p className="change_link">
            Already a member ?
            <a onClick={this.redirectLogin} href="javascript:void(0)" className="to_register"> Sign In</a>
          </p>
        </section>
      </div>
    );
  }
}

export default Register;
