import { Component } from 'react';
import './App.css';
import Sitebar from "./components/home/navbar";
import Auth from "./components/auth/auth";

document.title = "Nice Boy Vice"

export interface AppState {
  sessionToken: string | null;
}
 
class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { sessionToken: "" };
  }

  componentDidMount(){
    if(localStorage.getItem("token")){
      this.setState({
        sessionToken: localStorage.getItem("token")}
        );
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken
    });
    console.log(this.state.sessionToken);
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({
      sessionToken: ""
    });
  }

  protectedViews = () => {
    return (this.state.sessionToken === localStorage.getItem("token") ? <StoreIndex token={this.state.sessionToken}/>
    : <Auth updateToken={this.updateToken}/>)
  }

  render() { 
    return (
      <div>
      <Sitebar clickLogout={clearToken}/>
      {protectedViews()}
    </div>
    );
  }
}
 
export default App;
