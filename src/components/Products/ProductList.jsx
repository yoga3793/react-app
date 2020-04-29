import React, { Component } from 'react'
import { ProductItem } from "./index";
import { getProducts } from '../../services/index';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
			<div>
			
			<div className="products-breadcrumb fixed-top">
				<div className="container">
					<ul className="mb-0">
						<li><i className="fa fa-home" aria-hidden="true"></i>
						<a href="/">Home</a><span>|</span></li>
						<li>Products List</li>
					</ul>
				</div>
			</div>
			<div className=" container">
				{/* <h3 className="card-title text-light">List of Products</h3> */}
				{/* <hr/> */}
				<div className="card-columns">
                    {products.map((product, index) => <ProductItem product={product} key={index}/>)}
				</div>
				
			</div>
			</div>
		);
	}
}

export default ProductList
