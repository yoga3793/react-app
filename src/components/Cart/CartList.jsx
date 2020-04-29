import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from "./index";
import { getCartProducts } from '../../services/services';

import "./cart.css";

export class CartList extends Component {
   state ={
      products : [],
      totalPrice: 0,
      totalCount : 0
   }


	componentWillMount() {
      let cart = {};
      let quickCart  = localStorage.getItem('quick-cart');
          if(quickCart){
            cart = quickCart;
            // localStorage.removeItem('quick-cart');
          } else {
            cart = localStorage.getItem('cart');
          }
      if (!cart) return; 
		getCartProducts(cart).then((products) => {
         console.log(products);
         let totalPrice = 0;
         let totalCount = 0;
			for (var i = 0; i < products.length; i++) {
            totalPrice += products[i].price * products[i].qty;
            totalCount += products[i].qty;
			}
	    	this.setState({ products, totalPrice,totalCount });
	    });
	}

	removeFromCart = (product) => {
      debugger;
		let products = this.state.products.filter((item) => item._id !== product._id);
		let cart = JSON.parse(localStorage.getItem('cart'));
		delete cart[product._id.toString()];
		localStorage.setItem('cart', JSON.stringify(cart));
		let totalPrice = this.state.totalPrice - (product.qty * product.price) ;
		let totalCount = this.state.totalCount - product.qty; 
      this.setState({products, totalPrice,totalCount});
      localStorage.removeItem('quick-cart');
   }
   
   // addToCart = product => {
   //    let products = this.state.products.filter((item) => item._id !== product._id);
	// 	let cart = JSON.parse(localStorage.getItem('cart'));
	// 	cart[product._id.toString()];
	// 	localStorage.setItem('cart', JSON.stringify(cart));
	// 	let totalPrice = this.state.totalPrice - (product.qty * product.price) ;
	// 	let totalCount = this.state.totalCount - product.qty; 
   //    this.setState({products, totalPrice,totalCount});
   // }

	clearCart = () => {
      localStorage.removeItem('cart');
      localStorage.removeItem('quick-cart');
		this.setState({products: [] , totalCount : 0});
   }
   
   render() {
      const { products, totalPrice,totalCount } =  this.state;
      return (
         <div>
			
			<div className="products-breadcrumb fixed-top">
				<div className="container">
					<ul className="mb-0">
						<li><i className="fa fa-home" aria-hidden="true"></i>
						<a href="/">Home</a><span>|</span></li>
						<li>Cart</li>
					</ul>
				</div>
			</div> 
   <div className="wrapper wrapper-content animated fadeInRight">
      <div className="row">
         <div className={ products.length  ? 'col-lg-9 col-12': 'col-12'}>
            <div className="ibox">
               <div className="ibox-title">
                  <span className="pull-right">(<strong>{totalCount}</strong>) items
                  {products.length ? <button className="btn btn-warning btn-sm float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Reset Cart</button> : ''}
                  </span>
                  <h5>Items in your cart</h5>
               </div>
               {
					products.map((product, index) => <CartItem product={product} remove={this.removeFromCart} key={index}/>)
               }
               {! products.length  ? 
                <div className="ibox-content text-center">
                  <h4> Your Cart is Empty</h4>
                  <Link className="btn btn-success" to="/">Go to Homepage</Link>
               </div>
               :
               <div className="ibox-content"> 
               <div className="">
               <Link to="/" className="btn btn-sm btn-success"><i className="fa fa-arrow-left" onClick={() =>  localStorage.removeItem('quick-cart') }></i> Continue shopping</Link>
               <Link to="/checkout" className="btn btn-primary btn-sm float-right"><i className="fa fa fa-shopping-cart"></i> Checkout</Link> 
               </div>
               </div>
               }
            </div>
            
         </div>
         { products.length ? 
         <div className="col-lg-3 col-12">
         <div className="ibox">
                <div className="ibox-title">
                    <h5>Cart Summary</h5>
                </div>
                <div className="ibox-content">
                    <span> Total </span>
                    <h2 className="font-bold"> ₹{totalPrice}</h2>
                    <hr/>
                    <span className="text-muted small"> *For United States, France and Germany applicable sales tax will be applied </span>
                    <div className="m-t-sm">
                        <div > 
                        <Link to="/checkout"className="btn btn-primary btn-sm"><i className="fa fa-shopping-cart"></i>Quick Checkout</Link>
                        
                        </div>
                    </div>
                </div>
            </div>
         </div> : ''}

        </div>
   </div>
       
     </div> )
   }
}

export default CartList
