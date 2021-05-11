import {Component, ChangeEvent, FormEvent} from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

export interface SignupProps {
    updateToken(newToken: string) : void;
}
 
export interface SignupState {
    username: string,
    email: string,
    password: string,
}
 
class Signup extends Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = { 
            username: "",
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetch("http://localhost:3000/guest_user/create", {
            method: "POST",
            body: JSON.stringify({guest_user:{username: this.state.username, email: this.state.email, password: this.state.password}}),
            headers: new Headers({
                "Content-Type": "application/json",
            })
        })
        .then((response) => response.json())
        .then((data) => {this.props.updateToken(data.sessionToken)})
    }

    render(){
        return (
        <div>
            <br/>
            <br/>
            <h1>Signup</h1>
            <br/>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                    onChange={(e: ChangeEvent) => this.setState({username: (e.target as HTMLTextAreaElement).value})} 
                    name="email" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                    onChange={(e: ChangeEvent) => this.setState({email: (e.target as HTMLTextAreaElement).value})} 
                    name="email" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                    onChange={(e: ChangeEvent) => this.setState({password: (e.target as HTMLTextAreaElement).value})} 
                    name="password" />
                </FormGroup>
                <Button type="submit" className="btn btn-outline-light">Signup</Button>
            </Form>
        </div>
        );
    }
}
 
export default Signup;
