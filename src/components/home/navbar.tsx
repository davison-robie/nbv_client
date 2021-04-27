import { Component }from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Button,
    Nav,
    NavItem
} from "reactstrap";

export interface SitebarProps {
    clearToken() : string;
}
 
export interface SitebarState {
    isOpen: boolean;
}
 
class Sitebar extends Component<SitebarProps, SitebarState> {
    constructor(props: SitebarProps) {
        super(props);
        this.state = { isOpen: false };
    }
    
    render(){
        return(
            <Navbar light expand="md">
                <NavbarBrand href="/">Nice Boy Vice</NavbarBrand>
                <NavbarToggler onClick={ontoggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button onClick={this.props.clearToken}>Logout</Button>
                    </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        )
    }
}
 
export default Sitebar;
