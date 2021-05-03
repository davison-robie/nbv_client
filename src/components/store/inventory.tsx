import { Component, MouseEvent } from 'react';
import { CardTitle, CardText, CardImg, Card, CardDeck, Button } from 'reactstrap';
import { iProduct } from "./store_index";


export interface InventoryProps {
    token: string | null;
    products: [iProduct] | [];
}
 
export interface InventoryState {
    itemInfo: string;
    product: iProduct;
}
 
class Inventory extends Component<InventoryProps, InventoryState> {
    constructor(props: InventoryProps) {
        super(props);
    }

    handleClick = (event: MouseEvent, product: iProduct) => {
        event.preventDefault();
        console.log("randomString", product);
        if (this.props.token != null) {                   
            fetch(`http://localhost:3000/cart_item/create`, {
                method: "POST",
                body: JSON.stringify({
                    product_id: product.id,
                    cart_id: 2,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                    image_url: product.image_url
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    "Authorization": this.props.token
                })
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)

            })
        }
    };

    inventoryMapper = () => {
        return this.props.products.map((product: iProduct, index: number) => {
            
            return (
                <Card>
                    <CardImg src={product.image_url}></CardImg>
                    <CardTitle>{product.name}</CardTitle>
                    <CardText>${product.price}</CardText>
                    <Button onClick={(event) => this.handleClick(event, product)} >Add to Cart</Button>
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