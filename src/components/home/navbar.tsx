import { Component }from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Button,
    Nav,
    NavLink,
    NavItem
} from "reactstrap";
import {Link} from 'react-router-dom';


export interface SitebarProps {
    clearToken: () => void;
}
 
export interface SitebarState {
    isOpen: boolean;
}
 
class Sitebar extends Component<SitebarProps, SitebarState> {
    constructor(props: SitebarProps) {
        super(props);
        this.state = { isOpen: false };
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen })
    
    render(){
        return(
            <Navbar class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top" expand="md">
                <NavbarBrand href="/">Nice Boy Vice</NavbarBrand>
                <NavbarToggler className="navbar-light navbar-toggler-icon" onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/app">
                            <NavLink>App</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/store">
                            <NavLink>Store</NavLink>
                        </Link>
                    </NavItem>
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
