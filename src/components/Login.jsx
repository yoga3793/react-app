import React, { Component } from "react";
import { BrowserRouter as Link, Redirect, withRouter } from "react-router-dom";
import { login } from "../services/index";
export class Login extends Component {
  state = {
    gotoRegister: false,
    email: "",
    password: "",
    validForm: false
  };

  redirectRegister = () => {
    this.setState({
      gotoRegister: true
    });
  };

  onChange = e => {
    debugger;
    this.setState({ [e.target.name]: e.target.value });
    // this.validateForm();
  };

  // validateForm = () => {
  //   debugger;
  //   const user = {
  //     email: this.state.email,
  //     password: this.state.password
  //   };
  //   let val = user.email.length > 0 && user.password.length > 0;
  //   this.setState({ validForm: val });
  // };

  onSubmit = e => {
    debugger;
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
      if (res) {
        console.log(res);
        this.props.history.push(`/`);
      }
    });
  };

  render() {
    if (this.state.gotoRegister) {
      return <Redirect to="/Register" />;
    }
    return (
      <div>
        <section className="form animated flipInX">
          <img src="../logo/logo.png" className="aligncenter logo" />
          <h2>Login To Your Account</h2>
          <p className="valid">Valid. Please wait a moment.</p>
          <p className="error">
            Error. Please enter correct Username &amp; password.
          </p>
          <form className="loginbox" autocomplete="off" onSubmit={this.onSubmit}>
            <input placeholder="Username" type="email" id="username" name="email" value={this.state.email} onChange={this.onChange} ></input>
            <input placeholder="Password" type="password" id="password" name="password" value={this.state.password} onChange={this.onChange}></input>
            <button id="submit" type="submit">Login</button>
          </form>
          <p className="change_link">
            Not a member yet ?
            <a href="javascript:void(0)" className="to_register" onClick={this.redirectRegister}> Sign Up</a>
          </p>
        </section>
      </div>
    );
  }
}

export default Login;
