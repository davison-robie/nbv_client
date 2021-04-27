import { Component, ChangeEvent, MouseEvent} from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

export interface LoginProps {
    updateToken(newToken: string) : void;
}
 
export interface LoginState {
    email: string,
    password: string
}

class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps){
        super(props);
        this.setState({
            email: "",
            password: ""
        })
    }

    handleSubmit = () => {
        //event.preventDefault();
        fetch(`http://localhost:3000/user/login`, {
            method: "POST",
            body: JSON.stringify({user:{email: this.state.email, password: this.state.password}}),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then((response) => response.json())
        .then((data) => {this.props.updateToken(data.sessionToken)})
    }
    
    render(){
        return(
        <div>
            <h1>Login</h1>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(event) => {this.setState({email: event.target.value})}} name="email"/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(event) => this.setState({password: event.target.value})} name="password" />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </div>
        )
    }
}
 
export default Login;