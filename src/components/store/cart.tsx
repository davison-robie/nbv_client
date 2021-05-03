import { Component } from 'react';
import { Table } from 'reactstrap';

interface iCartItem {
    product_id: number;
    cart_id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image_url: string
}

export interface CartProps {
    token: string | null,
}
 
export interface CartState {
    cartItems: [iCartItem] | [];
}
 
class Cart extends Component<CartProps, CartState> {
    constructor(props: CartProps) {
        super(props);
        this.state = { cartItems: [], };
    }

    fetchCart = () => {
        fetch("http://localhost:3000/cart_item/", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
            })
        })
        .then((res) => res.json())
        .then((cartItemData) => {
            this.setState({cartItems: cartItemData});
            console.log(cartItemData);
        })
    }

    componentDidMount() {
        this.fetchCart();
    }

    cartMapper = () => {
        return this.state.cartItems.map((cartItem: iCartItem, index: number) => {
            
            return (
                <tr>
                    <td>{cartItem.name}</td>
                    {/* <img src={cartItem.image_url} sizes="25px" alt="cart item image"></img> */}
                    <td>${cartItem.price}</td>
                    {/* <Button onClick={(event) => this.handleClick(event, product)} >Add to Cart</Button> */}
                </tr>
            )
        })
    }

    render() { 
        return (
            <div>
                <Table responsive="md" hover>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.cartMapper()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
 
export default Cart;