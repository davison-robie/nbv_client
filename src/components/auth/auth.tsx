import React from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import Login from "./login";
import Signup from "./signup";

type AuthState = {
    showLogin: Boolean
};

class Auth extends React.Component<{}, AuthState> {
    constructor(props){
        super(props)
        this.state = {
            showLogin: true
        }
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
                {this.state.showLogin ? <Login updateToken={props.updateToken}/> : <Signup updateToken={props.updateToken}/>}
                <br />
                <Button onClick = {this.handleToggle}>Already a member?</Button>
                </Col>
            </Row>
        </Container>
        )
    }
}

export default Auth;