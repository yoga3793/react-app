import React, { Component } from "react";
import { Link, withRouter, BrowserRouter as Router, Route } from "react-router-dom";
import { isAuthenticated } from '../services/index';
import {ProductList , ProductDetail} from "./Products/index";
import { checkout } from "./Checkout/index";
import { CartList } from "./Cart/index";

export class Layout extends Component {
  
  logOut = () => {
    localStorage.removeItem('x-access-token');
    this.props.history.push(`/Login`);
  }
  

  render() {
    const auth = isAuthenticated();
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
          <Link className="navbar-brand" to="/">
            <img src="../logo/logo.png" className="home-logo" />&nbsp;ShoppingCart
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
            <Link className="nav-item nav-link" to="/">Products</Link>
            <Link className="nav-item nav-link" to="/cart">cart</Link>
            <Link className="nav-item nav-link" to="/checkout">checkout</Link>
            
            
            </ul>
          </div>
          <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.logOut}>
            Logout
          </button>
        </nav>
        <div className="container mt-100">
        <Route exact path="/" component={ProductList} />
        <Route path="/product/:productId" component={ProductDetail} />
        <Route path="/cart" component={CartList} />
        <Route path="/checkout" component={checkout} />
        </div>
      </div>
      </Router>
    );
  }
}

export default Layout;
