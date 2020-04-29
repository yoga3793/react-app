import React, { Component } from 'react'
import { isAuthenticated, getCartProducts } from '../../services/services';
import {  Redirect, Link } from 'react-router-dom';
import "./checkout.css"
export class checkout extends Component {
    state = {
        products: [],
        total: 0
    }
	componentWillMount() {
		let cart = {};
		let quickCart  = localStorage.getItem('quick-cart');
			if(quickCart){
			  cart = quickCart;
			//   localStorage.removeItem('quick-cart');
			} else {
			  cart = localStorage.getItem('cart');
			}
		if (!cart) return; 
		getCartProducts(cart).then((products) => {
			let total = 0;
			for (var i = 0; i < products.length; i++) {
				total += products[i].price * products[i].qty;
			}
	    	this.setState({ products, total });
	    });
	}

	render() {
		
		if (!isAuthenticated()){
			localStorage.setItem('isCheckOut', true);
			return (<Redirect to="/login" />);
		} 
		const { products, total } =  this.state;
		return (
			<div>
			
			<div className="products-breadcrumb fixed-top">
				<div className="container">
					<ul className="mb-0">
						<li><i className="fa fa-home" aria-hidden="true"></i>
						<a href="/">Home</a><span>|</span></li>
						<li>Checkout</li>
					</ul>
				</div>
			</div> 
			<div className=" container bg-light">
				{/* <h3 className="card-title">Checkout</h3>
				<hr/> */}
				{
					products.map((product, index) => 
						<div key={index}>
							<div className="pt-3">
								<img src={product.image} className="checkout-prdct-img mr-2"/>
								{product.name} 
								<small> (quantity: {product.qty})</small>
								<span className="float-right text-primary">₹ {product.qty * product.price}</span>
							</div><hr/>
						</div>
					)
				}
				<hr/>
				{ products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">₹ {total}</span></h4><hr/></div>: ''}
				{ !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
				{ products.length ? <button className="btn btn-success float-right rounded-0" onClick={() => alert('Proceed to Pay')}>Pay</button>: '' }
				<Link to="/"><button className="btn btn-danger float-right rounded-0" style={{ marginRight: "10px" }}  onClick={() =>  localStorage.removeItem('quick-cart') } >Cancel</button></Link>
				<br/><br/><br/>
			</div></div>
		);
	}
}

export default checkout
