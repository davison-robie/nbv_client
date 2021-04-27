import { Component } from 'react';

export interface CartItemProps {
    cartItemInfo: string;
    token: string | null;
}
 
export interface CartItemState {
    placeholder: string;
}
 
class CartItem extends Component<CartItemProps, CartItemState> {
    constructor(props: CartItemProps) {
        super(props);
        this.state = { placeholder: "cart item" };
    }
    render() { 
        return (
            <div>
                <p>{this.state.placeholder} + {this.props.cartItemInfo}</p>
            </div>
        );
    }
}
 
export default CartItem;