import React, { Component } from 'react'
import { ProductItem } from "./index";
import { getProducts } from '../../services/index';
import { Link } from 'react-router-dom';

export class ProductList extends Component {
    state = {
        products : []
    }
    
    componentWillMount() {
		getProducts().then((products) => {
	      this.setState({ products });
	    });
	}

	render() {
		const { products } =  this.state;
		return (
			<div className=" container">
				<h3 className="card-title text-light">List of Available Products</h3>
				<hr/>
				<div className="card-columns">
                    {products.map((product, index) => <ProductItem product={product} key={index}/>)}
				</div>
				<hr/>
				<Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link>
				<Link to="/cart"><button className="btn btn-primary float-right" style={{  marginRight: "10px" }}>View Cart</button></Link>
				<br/><br/><br/>
			</div>
		);
	}
}

export default ProductList
