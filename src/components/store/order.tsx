import { Component } from 'react';

export interface OrderProps {
    
}
 
export interface OrderState {
    
}
 
class Order extends Component<OrderProps, OrderState> {
    constructor(props: OrderProps) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return (<div><p>order placeholder</p></div>);
    }
}
 
export default Order;