import React, { Component } from "react";
import { BrowserRouter as Router,Link ,Route,Switch } from "react-router-dom";
import "./App.css";
import {Register,Login,NotFound} from "./components/index";
import {ProductList , ProductDetail} from "./components/Products/index";
import { checkout } from "./components/Checkout/index";
import { CartList } from "./components/Cart/index";
import { isAuthenticated } from './services/services';
export class App extends Component {
state = {
  totalCount : 0
}

//   componentWillMount() {
//     let cart = localStorage.getItem('cart');
//     if (!cart) return; 
//     cart = JSON.parse(cart);
//     for (var i = 0; i < cart.length; i++) {
//       totalCount += products[i].qty;
// }
//   }
    
  logOut = () => {
    localStorage.removeItem('x-access-token');
    this.props.history.push(`/`);
  }

  render() {
    const auth = isAuthenticated();
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top pt-0 pb-0">
          <Link className="navbar-brand" to="/">
            <img src="../logo/logo.png" className="home-logo" />&nbsp;ShoppingCart
          </Link>

          <button className="navbar-toggler ml-auto mr-2" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"  aria-controls="collapsibleNavbar" aria-expanded="false" aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="d-lg-none d-md-none d-xl-none text-light" to="/cart"><i className="fas fa-shopping-cart"></i></Link>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
            <Link className="nav-item nav-link" to="/">Products</Link>            
            { (auth) ?<Link className="nav-item nav-link" to="/checkout">checkout</Link>:''}
            </ul>
          <div className="input-group ml-2 w-50">
          <div className="input-group-prepend">
            <span className="input-group-text bg-warning rounded-0" id="basic-addon1">
              <i className="fas fa-search"></i></span>
            </div>
            <input type="text" className="form-control rounded-0" placeholder="Search...." aria-label="search" />
          </div>
            <ul className="nav navbar-nav ml-auto">
            { !(auth) ?<Link className="nav-item nav-link" to="/Login"><i className="fas fa-user"></i> Login</Link>
            :<a className="nav-item nav-link" href="/" onClick={this.logOut}>Log out</a>
            } <Link className="nav-item nav-link" to="/cart">Cart <i className="fas fa-shopping-cart"></i></Link>             
            </ul>
          </div>    
        </nav>
        <div className="container mt-100">
        
        
          <Switch>
        <Route exact path="/" component={ProductList} />
        <Route exact path="/product/:id" render={(props)=>{ return(<ProductDetail id={props.match.params.id}/>)}} />
        {/* <Route path="/product/:pid" component={ProductDetail} /> */}
        <Route path="/cart" component={CartList} />
        <Route path="/checkout" component={checkout} />
        <Route path="/Register" component={Register} />
        { (!auth) ? <Route exact path="/Login" component={Login} /> : '' }
        <Route path="*" component={NotFound}/>
        </Switch>
        </div>
      </div>
      
      </Router>
      
    )
  }




}

export default App
