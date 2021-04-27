import {Component, ChangeEvent, MouseEvent} from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

export interface SignupProps {
    updateToken(newToken: string) : string;
}
 
export interface SignupState {
    email: string,
    password: string
}
 
class Signup extends Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = { 
            email: "",
            password: "" 
        };
    }
    
    handleSubmit = (event: MouseEvent) => {
        event.preventDefault();
        fetch("http://localhost:3000/user/register", {
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
        return (
        <div>
            <h1>Signup</h1>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                    onChange={(e: ChangeEvent) => this.setState({email: e.target.value})} 
                    name="email" 
                    value={this.state.email}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                    onChange={(e: ChangeEvent) => this.setState({password: e.target.value})} 
                    name="password" 
                    value={this.state.password}/>
                </FormGroup>
                <Button type="submit">Signup</Button>
            </Form>
        </div>
        );
    }
}
 
export default Signup;
