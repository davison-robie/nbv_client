import React from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import Login from "./login";
import Signup from "./signup";

export interface AuthProps {
    updateToken(newToken: string) : void;
}
 
export interface AuthState {
    showLogin: boolean;
}
 
class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = { showLogin: true };
    }

    handleToggle(){
        this.setState(
            { showLogin: !this.state.showLogin }
        )
    }

    render(){
        return(
            <Container className="auth-container">
            <Row>
                <Col md="6">
                {this.state.showLogin ? <Login updateToken={this.props.updateToken}/> : <Signup updateToken={this.props.updateToken}/>}
                <br />
                <Button onClick = {this.handleToggle}>Already a member?</Button>
                </Col>
            </Row>
        </Container>
        )
    }
}
 
export default Auth;