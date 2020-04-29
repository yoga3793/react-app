import React, { Component } from "react";
import { BrowserRouter as Link, Redirect, withRouter } from "react-router-dom";
import { login } from "../services/index";

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

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
        
        this.findNavigator();
      }
    });
  };

  findNavigator = () =>{
    if(localStorage.getItem('isCheckOut')){
      localStorage.removeItem('isCheckOut');
      window.location.href = '/checkout';
    } else{
      window.location.href = '/';
    }
  }

  render() {

    const responseFacebook = (response) => {
      localStorage.setItem('x-access-token', response.accessToken);
      localStorage.setItem('x-access-token-expiration',  Date.now() + 2 * 60 * 60 * 1000);
      localStorage.setItem('user-detail', {
        user_id : response.id,
        user_typr: response.graphDomain,
        profile: response.picture.url
      });
      this.findNavigator();
      console.log(response);
    }

    const responseGoogle = (response) => {
      console.log(response);
    }

    if (this.state.gotoRegister) {
      return <Redirect to="/Register" />;
    }
    return (


      <div>
        <section className="form animated flipInX">
          <div className="form-inline">
          <img src="../logo/logo.png" className="aligncenter logo" />
          <h2 className="m-0">Login To Your Account</h2>
          </div>
          <p className="valid">Valid. Please wait a moment.</p>
          <p className="error">
            Error. Please enter correct Username &amp; password.
          </p>
          <form className="loginbox" autocomplete="off" onSubmit={this.onSubmit}>
            <input placeholder="Username" type="email" id="username" name="email" value={this.state.email} onChange={this.onChange} ></input>
            <input placeholder="Password" type="password" id="password" name="password" value={this.state.password} onChange={this.onChange}></input>
            <button id="submit" type="submit" className="btn-login">Login</button>
          </form>
          <GoogleLogin clientId=""  
          buttonText="LOGIN WITH GOOGLE" onSuccess={responseGoogle} onFailure={responseGoogle}  />
          <FacebookLogin autoLoad={false} appId="" fields="name,email,picture" callback={responseFacebook} cssClass="my-fb-btn mt-1 p-1 btn-block" />
          <br/>
          
          <p className="change_link m-0 mt-1 ">
            Not a member yet ?
            <a href="javascript:void(0)" className="to_register" onClick={this.redirectRegister}> Sign Up</a>
          </p>
        </section>
      </div>
    );
  }
}

export default Login;
