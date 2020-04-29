import React, { Component } from 'react'
import { Link,Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../services/index';

export class ProductItem extends Component {

	state = {
		quantity: 1,
		redirect : false		
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})
   

	addToCart = () => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		let id = this.props.product._id.toString();
		cart[id] = (cart[id] ? cart[id]: 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.available_quantity < qty) {
			cart[id] = this.props.product.available_quantity; 
		} else {
			cart[id] = qty
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		if(isAuthenticated()){
			var array = Object.keys(cart).map(function(key) {
				return ({"p_id" : key,"qty":cart[key]});
			  })
		}
	}

	quickBuy = () => {
		let cart = {};
		let id = this.props.product._id.toString();
		cart[id] = 0;
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.available_quantity < qty) {
			cart[id] = this.props.product.available_quantity; 
		} else {
			cart[id] = qty
		}
		localStorage.setItem('quick-cart', JSON.stringify(cart));
		window.location.href = "/cart"
		
	}

	render(){
		if(localStorage.getItem('quick-cart')){
			return (<Redirect to="/cart" />);
		}
		const { product } = this.props;
		return (

			<div className="card"  style={{ marginBottom: "10px"}}>
    <img className="card-img-top" src={product.image} alt={product.name}/>
    <div className="card-body">
      <h5 className="card-title" ><Link to={`product/`+product._id}>{product.name}</Link></h5>
      {/* <p className="card-text">{product.description}</p> */}
	  <h5 className="card-text"><small>Price: </small>₹{product.price}</h5>
	  <span className="card-text"><small>Available Quantity: </small>{product.available_quantity}</span>
    </div>
    <div className="card-footer text-center m-1">
	{ product.available_quantity > 0 ?
	 	    	<div>
						<button className="btn btn-lg btn-dark rounded-0 mb-lg-0 mb-md-1 mr-lg-1" 
						onClick={this.addToCart} ><i class="fa fa-shopping-cart"></i> Add to cart</button>
						<button className="btn btn-lg btn-warning rounded-0 " onClick={this.quickBuy}> 
						<i className="fas fa-bolt"></i> Buy Now</button>
			    		{/* <input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/> */}
					</div> 
					: 
			    	<p className="text-danger"> product is out of stock </p>
			 	}
    </div>
  </div>

		   
		)
	}
}

export default ProductItem
