import { Component } from 'react';
import { CardTitle, Modal } from 'reactstrap';
import Inventory from "./inventory";
import Cart from "./cart";
import APIURL from "../helpers/environment";

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
    price: number;
    quantity: number | undefined;
    image_url: string | undefined
}

export interface StoreIndexProps {
    token: string | null;
}
 
export interface StoreIndexState {
    products: [iProduct] | [];
    cartItems: [iCartItem] | [];
    total: number;
}
 
class StoreIndex extends Component<StoreIndexProps, StoreIndexState> {
    constructor(props: StoreIndexProps) {
        super(props);
        this.state = {
            products: [],
            cartItems: [],
            total: 0
        }
    }

    adminToggle = () => {
        
    }

    fetchInventory = () => {
        fetch(`${APIURL}/product/`, {
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
        // this.setTotal();
    }

    fetchCart = () => {
        if (this.props.token !== null) {
            fetch(`${APIURL}/cart_item/`, {
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
            .then(() => this.setTotal())
            .catch(error => {
                throw(error);
            })
        }
    }

    setTotal = () => {
        if (this.state.cartItems !== undefined) {
            let i: number;
            let priceArray: number[] = [];
            for (i = 0; i < this.state.cartItems.length; i++) {
                priceArray.push(this.state.cartItems[i].price);
            }
            let cartTotal = priceArray.reduce((a, b) => a + b, 0)
            this.setState({total: cartTotal})
        }
    }

    render() { 
        return (
            <div className="storeIndex">
                <Inventory products={this.state.products} fetchCart={this.fetchCart} token={this.props.token}/>
                <Cart fetchCart={this.fetchCart} cartItems={this.state.cartItems} total={this.state.total} token={this.props.token}/>
            </div>
        );
    }
}
 
export default StoreIndex;