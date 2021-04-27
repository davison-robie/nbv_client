import { Component } from 'react';

export interface GridSongOneProps {
    token: string | null;
}
 
export interface GridSongOneState {
    
}
 
class GridSongOne extends Component<GridSongOneProps, GridSongOneState> {
    constructor(props: GridSongOneProps) {
        super(props);
        // this.state = { :  };
    }

    render() { 
        return (
            <div>
                <p>app placeholder</p>
                <p>{this.props.token}</p>
            </div>
        );

    }
}
 
export default GridSongOne;