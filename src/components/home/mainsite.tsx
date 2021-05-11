import { Component } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { Navbar } from 'reactstrap';
import StoreIndex from "../store/store_index"
import GridSongOne from "../music_app/gridsong_one";
import Order from "../store/order"

export interface MainSiteProps {
    token: string | null;
}
 
export interface MainSiteState {
    
}
 
class MainSite extends Component<MainSiteProps, MainSiteState> {
    constructor(props: MainSiteProps) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return (
            <div className="mainDiv">
                <Switch>
                    <Route exact path="/"><StoreIndex token={this.props.token}/></Route>
                    <Route exact path="/store"><StoreIndex token={this.props.token}/></Route>
                    <Route exact path="/app"><GridSongOne token={this.props.token}/></Route>
                    <Route exact path="/checkout"><Order token={this.props.token}/></Route>
                </Switch>
                <Navbar className="dark fixed-bottom">2021 Nice Boy Vice</Navbar>
            </div>
        );
    }
}
 
export default MainSite;