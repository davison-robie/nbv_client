import { Component, MouseEvent, ChangeEvent } from 'react';
import { Form, FormGroup, Col, Input, Button, Modal } from 'reactstrap';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import APIURL from "../helpers/environment";
import { Link } from "react-router-dom";

export interface OrderProps {
    token: string | null;
}
 
export interface OrderState {
    first_name: string;
    last_name: string;
    mobile: number;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    displayForm: boolean;
    error: boolean;
    orderModal: boolean;
}
 
class Order extends Component<OrderProps, OrderState> {
    constructor(props: OrderProps) {
        super(props);
        this.state = { 
            first_name: "",
            last_name: "",
            mobile: 5555555555,
            email: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            displayForm: true,
            error: false,
            orderModal: false,
          };
    }
    handleClick = async (event: MouseEvent) => {
        event.preventDefault();
        this.setState({ orderModal: true })
    }

    render() { 
        return (<div>
            <Form className="w-75">
                <FormGroup row>
                    <Col md={6}>   
                        <Input 
                        onChange={(e: ChangeEvent) => this.setState({first_name: (e.target as HTMLTextAreaElement).value})} 
                        name="First Name" placeholder="First Name"/>
                    </Col>
                    <Col md={6}>
                        <Input 
                        onChange={(e: ChangeEvent) => this.setState({last_name: (e.target as HTMLTextAreaElement).value})} 
                        name="Last Name" placeholder="Last Name"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col>
                        <Input 
                        onChange={(e: ChangeEvent) => this.setState({mobile: parseInt((e.target as HTMLTextAreaElement).value)})} 
                        name="phone" placeholder="Phone Number"/>
                    </Col>
                    <Col>
                        <Input 
                        onChange={(e: ChangeEvent) => this.setState({email: (e.target as HTMLTextAreaElement).value})} 
                        name="email" placeholder="Email"/>
                    </Col>
                </FormGroup>
                <FormGroup className="w-50">
                    <Input 
                    onChange={(e: ChangeEvent) => this.setState({country: (e.target as HTMLTextAreaElement).value})} 
                    name="Country" placeholder="Country"/>
                </FormGroup>
                <FormGroup className="w-75">
                    <Input 
                    onChange={(e: ChangeEvent) => this.setState({address1: (e.target as HTMLTextAreaElement).value})} 
                    name="Address Line 1" placeholder="Address Line 1"/>
                </FormGroup>
                <FormGroup className="w-75">
                    <Input 
                    onChange={(e: ChangeEvent) => this.setState({address2: (e.target as HTMLTextAreaElement).value})} 
                    name="Address Line 2" placeholder="Address Line 2"/>
                </FormGroup>
                <FormGroup row>
                    <Col sm={6}>
                        <Input 
                        onChange={(e: ChangeEvent) => this.setState({city: (e.target as HTMLTextAreaElement).value})} 
                        name="City" placeholder="City"/>
                    </Col>
                    <Col sm={2}>
                        <Input 
                        onChange={(e: ChangeEvent) => this.setState({state: (e.target as HTMLTextAreaElement).value})} 
                        name="State" placeholder="State/Province"/>
                    </Col>
                    <Col sm={4}>
                        <Input 
                        onChange={(e: ChangeEvent) => this.setState({zip: (e.target as HTMLTextAreaElement).value})} 
                        name="Zip" placeholder="Zip/Post Code"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                fontSize: '20px',
                                color: 'white',
                                '::placeholder': {
                                color: '#aab7c4',
                                },
                                },
                                invalid: {
                                color: '#9e2146',
                                iconColor: 'blue',
                                },
                                complete: {},
                        },
                        hidePostalCode: false,
                        }}
                    />
                </FormGroup>
            </Form>
            <Button onClick={this.handleClick} className="btn btn-outline-light">Place Order</Button> 
            <Modal 
            isOpen={this.state.orderModal}
            style={{color: 'black', padding: '10px'}}>
                Thanks for your purchase! We'll send you an e-mail confirmation shortly.
                <Link to="/">
                <Button className="btn btn-outline-light">Home</Button> 
                </Link>
            </Modal>
        </div>);
    }
}
 
export default Order;