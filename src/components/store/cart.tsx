import { Component, MouseEvent } from 'react';
import { 
    Modal, 
    Table,
    Button,
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'reactstrap';

interface iCartItem {
    id: number | undefined;
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
                id: undefined,
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
        if (this.props.token !== null) {
            fetch("http://localhost:3000/cart_item/", {
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
        }
    }

    componentDidMount() {
        this.fetchCart();
    }
    // emptyCartToggle = () => {
    //     // if (this.state.cartItems !== []) {
    //         return (
    //             <div>
    //                 <ModalHeader><h1>Cart</h1></ModalHeader>
    //                 <ModalBody>
    //                     <Table responsive="md" hover>
    //                         <thead>
    //                             <tr>
    //                                 <th>Item</th>
    //                                 <th>Price</th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             {this.cartMapper()}
    //                         </tbody>
    //                     </Table>
    //                 </ModalBody>
    //                 <ModalFooter>
    //                     <Button className="btn btn-outline-light" onClick={this.order}>Checkout</Button>
    //                 </ModalFooter>
    //                 <Modal isOpen={this.state.detailModal} toggle={this.detailToggle}>
    //                     <ModalBody>
    //                         <img src={this.state.oneCartItem.image_url} alt={this.state.oneCartItem.name} width="100%"/>
    //                         <h2>{this.state.oneCartItem.name}</h2>
    //                         <h2>{this.state.oneCartItem.description}</h2>
    //                         <h2>{this.state.oneCartItem.price}</h2>
    //                     </ModalBody>
    //                     <ModalFooter>
    //                         <Button className="btn btn-outline-light" onClick={(event) => this.removeCartItem(event, this.state.oneCartItem)}>Remove from Cart</Button>
    //                     </ModalFooter>
    //                 </Modal>
    //             </div>   )         
    //     // )} else {
    //     //     return (
    //     //         <div>
    //     //             <ModalHeader><h1>Cart</h1></ModalHeader>
    //     //             <ModalBody><h2>"Your cart is empty :("</h2></ModalBody>
    //     //         </div>
    //     //     )
    //     // };        
    // }    

    cartMapper = () => {
        console.log("hello", this.state.cartItems);
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

    removeCartItem = (event: MouseEvent, oneCartItem: iCartItem) => {
        console.log(oneCartItem.id);
        if (this.props.token !== null) {
            fetch(`http://localhost:3000/cart_item/delete/${oneCartItem.id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.token
                })
            })
            .then(() => this.fetchCart())
            .then(() => this.detailToggle());
        }
    };

    clearCart = (event: MouseEvent) => {
        if (this.props.token !== null) {
            fetch(`http://localhost:3000/cart_item/delete`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.token
                })
            })
            .then(() => this.fetchCart())
        }
    };

    order = () => console.log("proceed to checkout");

    render() { 
        return (

            <div>
                <Button className="btn btn-outline-light" onClick={this.toggle}>View Cart</Button>
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
                        <Button className="btn btn-outline-light" onClick={this.clearCart}>Remove All Items from Cart</Button>
                        <Button className="btn btn-outline-light" onClick={this.order}>Checkout</Button>
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
            </div>
        );
    }
}
 
export default Cart;