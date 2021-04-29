import { Component } from 'react';
import { Card, CardDeck } from 'reactstrap';

export interface InventoryProps {
    token: string | null;
    products: [string, string, number, number, string];
}
 
export interface InventoryState {
    itemInfo: string;
    product: [string, string, number, number, string];
}
 
class Inventory extends Component<InventoryProps, InventoryState> {
    constructor(props: InventoryProps) {
        super(props);
        this.inventoryMapper = this.inventoryMapper.bind(this);
    }

    inventoryMapper = () => {
        return this.props.products.map((product, index) => {
            return (
                <Card>
                    {this.state.product.name}
                </Card>
            )
        })
    }

    render() { 
        return (
            <div>
                <CardDeck>
                    {this.inventoryMapper()}
                </CardDeck>
            </div>
        );
    }
}
 
export default Inventory;