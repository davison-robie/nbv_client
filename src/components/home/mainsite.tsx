import { Component } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import {  } from 'reactstrap';
import StoreIndex from "../store/store_index"
import GridSongOne from "../music_app/gridsong_one";

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
            <div className="mainSite">
                <Switch>
                    <Route exact path="/store"><StoreIndex token={this.props.token}/></Route>
                    <Route exact path="/app"><GridSongOne token={this.props.token}/></Route>
                </Switch>
                <footer className="fixed-bottom">2021 Nice Boy Vice</footer>
            </div>
        );
    }
}
 
export default MainSite;