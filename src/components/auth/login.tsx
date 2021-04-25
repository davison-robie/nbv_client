import React from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

type LoginState = {
    email: String,
    password: String
}

class Login extends React.Component<{}, LoginState> {
    constructor(props){
        super(props);
        this.setState = {
            email: "",
            password: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
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
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password}/>
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </div>
        )
    }
}
 
export default Login;