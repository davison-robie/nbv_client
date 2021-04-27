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
            products: "Info for a single product"
        }
    }
    render() { 
        return (
            <div>
                <Inventory products={this.state.products} token={this.props.token}/>
                <Cart token={this.props.token}/>
            </div>
        );
    }
}
 
export default StoreIndex;