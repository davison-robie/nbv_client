import { Component, MouseEvent } from 'react';
import { CardTitle,
         CardText, 
         CardImg, 
         Card, 
         CardDeck, 
         Button,
         Modal,
         ModalBody,
         ModalFooter   
        } from 'reactstrap';
import { iProduct } from './store_index';
import { iCartItem } from "./store_index";


export interface InventoryProps {
    token: string | null;
    products: [iProduct] | [];
    fetchCart() : [iCartItem] | void;
}
 
export interface InventoryState {
    oneProduct: iProduct;
    product: iProduct | [];
    modal: boolean;
}
 
class Inventory extends Component<InventoryProps, InventoryState> {
    constructor(props: InventoryProps) {
        super(props);
        this.state = {
            oneProduct: {
                id: undefined,
                name: undefined, 
                description: undefined,
                price: undefined,
                quantity: undefined,
                image_url: undefined
            },
            product: [],
            modal: false
        }
    }

    handleClick = (event: MouseEvent, product: iProduct) => {
        event.preventDefault();
        console.log("randomString", product);
        if (this.props.token != null) {                   
            fetch(`http://localhost:3000/cart_item/create`, {
                method: "POST",
                body: JSON.stringify({
                    product_id: product.id,
                    // cart_id: {user.id},
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
            .then(this.props.fetchCart)
        }
    };

    inventoryMapper = () => {
        return this.props.products.map((product: iProduct, index: number) => {
            
            return (
                <Card>
                    <CardImg src={product.image_url}></CardImg>
                    <CardTitle>{product.name}</CardTitle>
                    <CardText>${product.price}</CardText>
                    <Button type="button" className="btn-sm btn-outline-light" onClick={(event) => this.detailClick(event, product)}>Details</Button>
                    <Button type="button" className="btn-sm btn-outline-light" onClick={(event) => this.handleClick(event, product)} >Add to Cart</Button>
                </Card>
            )
        })
    }

    toggle = () => this.setState({modal: !this.state.modal});
    detailClick = (event: MouseEvent, product: iProduct) => {
        event.preventDefault();
        this.toggle();
        this.setState({oneProduct: product})
        console.log(this.state.oneProduct.name)
    }

    render() { 
        return (
            <div>
                <CardDeck>
                    {this.inventoryMapper()}
                </CardDeck>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalBody>
                            <img src={this.state.oneProduct.image_url} alt={this.state.oneProduct.name} width="100%"/>
                            <h2>{this.state.oneProduct.name}</h2>
                            <h2>{this.state.oneProduct.description}</h2>
                            <h2>{this.state.oneProduct.price}</h2>
                        </ModalBody>
                        <ModalFooter>
                        <Button type="button" className="btn-sm btn-outline-light" onClick={(event) => this.handleClick(event, this.state.oneProduct)} >Add to Cart</Button>
                        </ModalFooter>
                </Modal>
            </div>
        );
    }
}
 
export default Inventory;