import { Component } from 'react';
import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Sitebar from "./components/home/navbar";
import Auth from "./components/auth/auth";
import MainSite from "./components/home/mainsite";

document.title = "Nice Boy Vice"
const stripePromise = loadStripe("pk_live_51InkZZBP2qomn21qNpeJ0Np1GjRgjrsSCc8jMgreZsiZO8oJXO4Av775mx7UdltvdpBLaNyoGTAG0PpS8H3XZ5qm00EJ7KpaHF");

export interface AppState {
  sessionToken: string | null;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { sessionToken: null };
    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
    this.protectedViews = this.protectedViews.bind(this);
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
    return (this.state.sessionToken === localStorage.getItem("token") ? <MainSite token={this.state.sessionToken} />
    : <Auth updateToken={this.updateToken}/>)
  }

  render() { 
    return (
      <div>
        <Elements stripe={stripePromise}>
      <Sitebar clearToken={this.clearToken}/>
      {this.protectedViews()}
        </Elements>
    </div>
    );
  }
}
 
export default App;
