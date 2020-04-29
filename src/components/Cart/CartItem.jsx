import React, { Component } from 'react'

export class CartItem extends Component {
    state = {
        quantity: 1
    }

   

    render() {
        const { product } = this.props;
      
        return (
            <div className="ibox-content">
            <div className="table-responsive">
               <table className="table shoping-cart-table">
                  <tbody>
                     <tr>
                        <td width="90">
                           <img className="cart-product-imitation" src={product.image}/>
                        </td>
                        <td className="desc">
                           <h3> <a href="#" className="text-navy"> {product.name} </a></h3>
                           <p className="small"> 
                           <div className="m-t-sm"> 
                           <a href="#" className="text-muted">
                               <i className="fa fa-gift"></i> Add gift package</a> | 
                               <a href="javascript:void(0)" className="text-muted" onClick={() => this.props.remove(product)} ><i className="fa fa-trash"></i> Remove item</a></div>

                           </p>
                           
                        </td>
                        <td>₹ {product.price}</td>
                        <td width="65"><input type="text" className="form-control" 
                        placeholder="1" value={product.qty} name="quantity" /></td>
                        <td>
                           <h4> ₹{product.price * product.qty}</h4>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
        )
    }
}

export default CartItem
