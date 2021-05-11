import { Component, FormEvent, ChangeEvent } from 'react';
import { Form, FormGroup, Col, Input, Button } from 'reactstrap';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

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
    stripe: any;
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
            stripe: useStripe,
          };
    }
    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (this.props.token !== null) {
            // const { stripe, elements } = this.props;
            if (this.state.stripe) {
                // console.log("In If")
                const { error, paymentMethod } = await this.state.stripe.createPaymentMethod({
                    type: 'card',
                    card: CardElement,
                });
                if (error) {
                    console.log('[error]', error);
                    this.setState({ error: true})
                } else {
                    console.log('[PaymentMethod]', paymentMethod);
                    this.setState({
                        displayForm: false
                    })
                }
            }
            fetch("http://localhost:3000/order/create", {
                method: "POST",
                body: JSON.stringify({ order:{
                    cart_items: "",
                    total: "",
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    mobile: this.state.mobile,
                    email: this.state.email,
                    address1: this.state.address1,
                    address2: this.state.address2,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                    country: this.state.country
                    }
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.token
                })
            })
            .then((response) => response.json())
        }
    }

    render() { 
        return (<div>
            <Form className="w-75" onSubmit={this.handleSubmit}>
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
                                color: 'black',
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
                <FormGroup>
                    <Button type="submit" className="btn btn-outline-light">Place Order</Button>                            
                </FormGroup>
            </Form>
        </div>);
    }
}
 
export default Order;