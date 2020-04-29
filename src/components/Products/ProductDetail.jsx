import React, { Component } from 'react'
import "./ProductDetail.css"
import { getProduct } from '../../services/index';
import { isAuthenticated } from '../../services/index';
import { Link,Redirect } from 'react-router-dom';


export class ProductDetail extends Component {

    state = {
        product : {},
        quantity: 1
    }
    

    componentWillMount() {
        console.log('this.props.id' + this.props.id)
        getProduct(this.props.id).then((products) => {
          this.setState({ product : products[0] });
        //   console.log(products);
        });
    }

    addToCart = () => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		let id = this.state.product._id.toString();
		cart[id] = (cart[id] ? cart[id]: 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.state.product.available_quantity < qty) {
			cart[id] = this.state.product.available_quantity; 
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
        debugger;
		let cart = {};
		let id = this.state.product._id.toString();
		cart[id] = 0;
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.state.product.available_quantity < qty) {
			cart[id] = this.state.product.available_quantity; 
		} else {
			cart[id] = qty
		}
		localStorage.setItem('quick-cart', JSON.stringify(cart));
		window.location.href = "/cart"
		
	}

    render() {
        if(localStorage.getItem('quick-cart')){
			return (<Redirect to="/cart" />);
		}
        const product = this.state.product;
       
        return (
            <div>
			
			<div className="products-breadcrumb fixed-top">
				<div className="container">
					<ul className="mb-0">
						<li><i className="fa fa-home" aria-hidden="true"></i>
						<a href="/">Home</a><span>|</span></li>
						<li>Products Detail</li>
					</ul>
				</div>
			</div> 
<section className="panel pt-5 bg-light">
      <div className="mx-1 my-1 row">
          <div className="col-md-6 text-center">
              <div className="pro-img-details">
                  <img src={product.image} alt="" />
                  <div className="pro-img-list">
                  <a href="#">
                      <img src="https://rukminim1.flixcart.com/image/416/416/k7dnonk0/television/x/z/a/vu-50pm-50pm-original-imafpmrtnndkp5zt.jpeg?q=70" alt="" />
                  </a>
                  <a href="#">
                      <img src="https://rukminim1.flixcart.com/image/416/416/k7dnonk0/television/x/z/a/vu-50pm-50pm-original-imafpmrth4xbkm4v.jpeg?q=70" alt="" />
                  </a>
                  <a href="#">
                      <img src="https://rukminim1.flixcart.com/image/416/416/k7dnonk0/television/x/z/a/vu-50pm-50pm-original-imafpmrtzk5azhyp.jpeg?q=70" alt="" />
                  </a>
                  <a href="#">
                      <img src="https://rukminim1.flixcart.com/image/416/416/k7dnonk0/television/x/z/a/vu-50pm-50pm-original-imafpmrtghufs2zr.jpeg?q=70" alt="" />
                  </a>
              </div>
                  <ul className="mt-2 mx-0 p-d-btn-grp pl-0 row">
                    <li><button className="btn btn-lg btn-dark rounded-0 mb-lg-0 mb-md-1 mr-lg-1" onClick={this.addToCart}><i className="fa fa-shopping-cart"></i> Add to cart</button></li>
                    <li><button className="btn btn-lg btn-warning rounded-0 " onClick={this.quickBuy} ><i className="fa fa-bolt" ></i> Buy Now</button></li>
                  </ul>
              </div>
              
              
          </div>
          <div className="col-md-6">
              <h4 className="pro-d-title">{product.name}</h4>
              <div className="m-bot15"> <strong>Price : <span className="">₹ {product.price}</span></strong></div>            
             
              <div className="product_meta">
                  <span className="posted_in"> <strong>Categories:</strong> <a rel="tag" href="#">Electronics</a>,
                  <a rel="tag" href="#">Home Applicances</a>.</span>
                  <span className="tagged_as"><strong>Tags:</strong> <a rel="tag" href="#">Tv</a>, <a rel="tag" href="#">Smart Tv</a>.</span>
              </div>
              <strong>Specifications:</strong>
              <ul>
                  {product.specification}
             
              </ul>
              <p>
              <strong>Description:</strong>
              <ul>
                  {product.description}
             
              </ul>
              </p>
          </div>
      </div>

      
  </section>
  </div>
        )
    }
}

export default ProductDetail
