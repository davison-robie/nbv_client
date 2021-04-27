import { Component } from 'react';
import CartItem from "./cart_items"

export interface CartProps {
    token: string | null,
}
 
export interface CartState {
    cartItemInfo: string;
}
 
class Cart extends Component<CartProps, CartState> {
    constructor(props: CartProps) {
        super(props);
        this.state = { cartItemInfo: "some info about the item" };
    }
    render() { 
        return (
            <div>
                <CartItem cartItemInfo={this.state.cartItemInfo} token={this.props.token}/>
            </div>
        );
    }
}
 
export default Cart;