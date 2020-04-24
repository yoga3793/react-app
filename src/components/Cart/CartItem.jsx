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
                           <img className="cart-product-imitation" src="data:image/jpeg;base64,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"/>
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
                        <td>₹ {product.price} <s className="small text-muted">₹{product.price}</s></td>
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
