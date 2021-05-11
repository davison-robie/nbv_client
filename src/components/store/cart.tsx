import { Component, MouseEvent } from 'react';
import { 
    Modal, 
    Table,
    Button,
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'reactstrap';
import { Link } from "react-router-dom";
import { iCartItem } from './store_index';
import APIURL from "../helpers/environment";

export interface CartProps {
    token: string | null,
    fetchCart() : [iCartItem] | void;
    cartItems: [iCartItem] | [];
    total: number;
}
 
export interface CartState {
    oneCartItem: iCartItem;
    modal: boolean;
    detailModal: boolean;
    adminInventoryModal: boolean;
}
 
class Cart extends Component<CartProps, CartState> {
    constructor(props: CartProps) {
        super(props);
        this.state = { 
            oneCartItem: {
                id: undefined,
                product_id: undefined, 
                cart_id: undefined, 
                name: undefined, 
                description: undefined,
                price: 0,
                quantity: undefined,
                image_url: undefined
            },
            modal: false, 
            detailModal: false,
            adminInventoryModal: false
         };
    }

    componentDidMount() {
        this.props.fetchCart();
    }

    cartMapper = () => {
        return this.props.cartItems.map((cartItem: iCartItem, index: number) => {
            return (
                <tr onClick={() => this.handleClick(cartItem)}>
                    <td>{cartItem.name}</td>
                    <td></td>
                    <td>${cartItem.price}</td>
                </tr>
            )
        })
    }

    setUser = () => {

    }

    toggle = () => this.setState({modal: !this.state.modal});
    detailToggle = () => this.setState({detailModal: !this.state.detailModal});
    adminInventoryToggle = () => this.setState({adminInventoryModal: !this.state.adminInventoryModal});

    handleClick = (cartItem: iCartItem) => {
        this.detailToggle();
        this.setState({oneCartItem: cartItem})
    }

    adminHandleClick = () => {

    }

    removeCartItem = (event: MouseEvent, oneCartItem: iCartItem) => {
        console.log(oneCartItem.id);
        if (this.props.token !== null) {
            fetch(`${APIURL}/cart_item/delete/${oneCartItem.id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.token
                })
            })
            .then(() => this.props.fetchCart())
            .then(() => this.detailToggle())
            .catch(error => {
                throw(error);
            })
        }
    };

    clearCart = (event: MouseEvent) => {
        if (this.props.token !== null) {
            fetch(`${APIURL}/cart_item/delete`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.token
                })
            })
            .then(() => this.props.fetchCart())
            .catch(error => {
                throw(error);
            })
        }
    };

    order = () => console.log("proceed to checkout");

    // adminToggle = () => {
    //     return (
    //         { guest_user.role != "admin" ? 
            
    //     }
    //     )
    // }

    emptyCartToggle = () => {
        if (this.props.cartItems.length !== 0) {
            return (
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="cartStyle">
                        <ModalHeader><h1>Cart</h1></ModalHeader>
                        <ModalBody>
                            <Table responsive="md" hover>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th></th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.cartMapper()}
                                </tbody>
                                <tfoot>
                                    <td></td>
                                    <th>Total:</th>
                                    <th>${this.props.total}</th>
                                    </tfoot>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="btn btn-outline-light" onClick={this.clearCart}>Remove All Items from Cart</Button>
                            <Link to="/checkout">
                                <Button className="btn btn-outline-light" onClick={this.order}>Checkout</Button>
                            </Link>
                        </ModalFooter>
                        <Modal isOpen={this.state.detailModal} toggle={this.detailToggle}>
                            <ModalBody>
                                <img src={this.state.oneCartItem.image_url} alt={this.state.oneCartItem.name} width="100%"/>
                                <h2>{this.state.oneCartItem.name}</h2>
                                <h2>{this.state.oneCartItem.description}</h2>
                                <h2>{this.state.oneCartItem.price}</h2>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="btn btn-outline-light" onClick={(event) => this.removeCartItem(event, this.state.oneCartItem)}>Remove from Cart</Button>
                            </ModalFooter>
                        </Modal>
                    </Modal>        
        )} else {
            return (
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="cartStyle">
                        <ModalHeader><h1>Cart</h1></ModalHeader>
                        <br/>
                        <ModalBody><h3>Your cart is empty...</h3></ModalBody>
                        <br/>
                    </Modal>
            )
        };        
    }


    render() { 
        return (
            <div>
                <Button className="btn btn-outline-light" onClick={this.toggle}>View Cart</Button>
                <Button className="btn btn-outline-light" onClick={this.adminHandleClick}>Edit Inventory</Button>
                {this.emptyCartToggle()}
            </div>
        );
    }
}
 
export default Cart;