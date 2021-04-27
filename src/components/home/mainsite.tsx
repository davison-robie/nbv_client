import { Component } from 'react';
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
            <div>
                <StoreIndex token={this.props.token}/>
                <GridSongOne token={this.props.token}/>
            </div>
        );
    }
}
 
export default MainSite;