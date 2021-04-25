import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Button,
    Nav,
    NavItem
} from "reactstrap";



class Sitebar extends React.Component <{}, {}>{
    constructor(props){
        super(props)
        this.setState(
            isOpen: false;
        )
    }

    render(){
        return(
            <Navbar light expand="md">
                <NavbarBrand href="/">Nice Boy Vice</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button onClick={props.clickLogout}>Logout</Button>
                    </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        )
    }
}

export default Sitebar;