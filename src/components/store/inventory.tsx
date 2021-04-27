import { Component } from 'react';
import { Card, CardDeck } from 'reactstrap';

export interface InventoryProps {
    token: string | null;
    products: string;
}
 
export interface InventoryState {
    itemInfo: string;
}
 
class Inventory extends Component<InventoryProps, InventoryState> {
    constructor(props: InventoryProps) {
        super(props);
        this.state = { itemInfo: "info for one item" };
    }
    render() { 
        return (
            <div>

            </div>
        );
    }
}
 
export default Inventory;