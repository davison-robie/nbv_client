import React from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";

type SignupState = {
    email: String,
    password: String
}

class Signup extends React.Component <{}, SignupState> {
    constructor(props){
        super(props);
        this.setState = {
            email: "",
            password: ""
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/user/register", {
            method: "POST",
            body: JSON.stringify({user:{email: email, password: password}}),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then((response) => response.json())
        .then((data) => {props.updateToken(data.sessionToken)})
    }
    
    render(){
        return (
        <div>
            <h1>Signup</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password}/>
                </FormGroup>
                <Button type="submit">Signup</Button>
            </Form>
        </div>
        );
    }
}
 
export default Signup;