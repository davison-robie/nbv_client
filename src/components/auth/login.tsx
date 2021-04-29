import { Component, ChangeEvent, FormEvent} from "react";
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
    username: string,
    email: string,
    password: string
}

class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps){
        super(props);
        this.setState({
            username: "",
            email: "",
            password: ""
        })
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetch(`http://localhost:3000/guest_user/login`, {
            method: "POST",
            body: JSON.stringify({guest_user:{username: this.state.username, email: this.state.email, password: this.state.password}}),
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
                    <Label htmlFor="name">Name</Label>
                    <Input 
                    onChange={(e: ChangeEvent) => this.setState({username: (e.target as HTMLTextAreaElement).value})} 
                    name="email" />
                </FormGroup>
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