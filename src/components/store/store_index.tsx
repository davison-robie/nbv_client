import { Component } from 'react';
import Inventory from "./inventory";
import Cart from "./cart";

export interface iProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image_url: string;
}

export interface StoreIndexProps {
    token: string | null;
}
 
export interface StoreIndexState {
    products: [iProduct] | [];
}
 
class StoreIndex extends Component<StoreIndexProps, StoreIndexState> {
    constructor(props: StoreIndexProps) {
        super(props);
        this.state = {
            products: [],
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
    render() { 
        return (
            <div className="storeIndex">
                <Inventory products={this.state.products} token={this.props.token}/>
                <Cart token={this.props.token}/>
            </div>
        );
    }
}
 
export default StoreIndex;