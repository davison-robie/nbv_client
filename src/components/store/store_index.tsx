import { Component } from 'react';
import Inventory from "./inventory";
import Cart from "./cart";

export interface StoreIndexProps {
    token: string | null;
}
 
export interface StoreIndexState {
    products: string;
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
        .then((logData) => {
            this.setState({products: logData});
            console.log(logData);
        })
    }

    componentDidMount() {
        this.fetchInventory();
    }
    render() { 
        return (
            <div>
                <Inventory product={this.state.products} token={this.props.token}/>
                <Cart token={this.props.token}/>
            </div>
        );
    }
}
 
export default StoreIndex;