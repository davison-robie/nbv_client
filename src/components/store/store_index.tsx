import { Component } from 'react';
import { Modal } from 'reactstrap';
import Inventory from "./inventory";
import Cart from "./cart";

export interface iProduct {
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    price: number | undefined;
    quantity: number | undefined;
    image_url: string | undefined;
}

export interface iCartItem {
    id: number | undefined;
    product_id: number | undefined;
    cart_id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    price: number | undefined;
    quantity: number | undefined;
    image_url: string | undefined
}

export interface StoreIndexProps {
    token: string | null;
}
 
export interface StoreIndexState {
    products: [iProduct] | [];
    cartItems: [iCartItem] | [];
}
 
class StoreIndex extends Component<StoreIndexProps, StoreIndexState> {
    constructor(props: StoreIndexProps) {
        super(props);
        this.state = {
            products: [],
            cartItems: []
        }
    }

    fetchInventory = () => {
        fetch("http://localhost:3000/product/", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
            })
        })
        .then((res) => res.json())
        .then((productData) => {
            this.setState({products: productData});
            console.log(productData);
        })
    }

    componentDidMount() {
        this.fetchInventory();
    }

    fetchCart = () => {
        if (this.props.token !== null) {
            fetch("http://localhost:3000/cart_item/", {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.token
                })
            })
            .then((res) => res.json())
            .then((cartItemData) => {
                this.setState({cartItems: cartItemData});
                console.log(cartItemData);
            })
        }
    }

    render() { 
        return (
            <div className="storeIndex">
                <Inventory products={this.state.products} fetchCart={this.fetchCart} token={this.props.token}/>
                <Cart fetchCart={this.fetchCart} cartItems={this.state.cartItems} token={this.props.token}/>
            </div>
        );
    }
}
 
export default StoreIndex;