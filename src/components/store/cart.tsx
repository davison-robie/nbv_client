import { VerifyPublicKeyInput } from 'crypto';
import { Component } from 'react';
import { 
    Modal, 
    Table,
    Button,
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'reactstrap';

interface iCartItem {
    product_id: number | undefined;
    cart_id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    price: number | undefined;
    quantity: number | undefined;
    image_url: string | undefined
}

export interface CartProps {
    token: string | null,
}
 
export interface CartState {
    cartItems: [iCartItem] | [];
    oneCartItem: iCartItem;
    modal: boolean;
    detailModal: boolean;
}
 
class Cart extends Component<CartProps, CartState> {
    constructor(props: CartProps) {
        super(props);
        this.state = { 
            cartItems: [], 
            oneCartItem: {
                product_id: undefined, 
                cart_id: undefined, 
                name: undefined, 
                description: undefined,
                price: undefined,
                quantity: undefined,
                image_url: undefined
            },
            modal: false, 
            detailModal: false,
         };
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
                <tr onClick={() => this.handleClick(cartItem)}>
                    <td>{cartItem.name}</td>
                    {/* <img src={cartItem.image_url} sizes="25px" alt="cart item image"></img> */}
                    <td>${cartItem.price}</td>
                </tr>
            )
        })
    }

    toggle = () => this.setState({modal: !this.state.modal});
    detailToggle = () => this.setState({detailModal: !this.state.detailModal});

    handleClick = (cartItem: iCartItem) => {
        this.detailToggle();
        this.setState({oneCartItem: cartItem})
    }

    order = () => console.log("proceed to checkout");

    render() { 
        return (

            <div>
                <Button color="danger" onClick={this.toggle}>View Cart</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="cartStyle">
                    <ModalHeader><h1>Cart</h1></ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter>
                    <Button color="danger" onClick={this.order}>Checkout</Button>
                    </ModalFooter>
                    <Modal isOpen={this.state.detailModal} toggle={this.detailToggle}>
                    <ModalBody>
                        <img src={this.state.oneCartItem.image_url} alt={this.state.oneCartItem.name} width="100%"/>
                        <h2>{this.state.oneCartItem.name}</h2>
                        <h2>{this.state.oneCartItem.description}</h2>
                        <h2>{this.state.oneCartItem.price}</h2>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                    </Modal>
                </Modal>
            </div>
        );
    }
}
 
export default Cart;