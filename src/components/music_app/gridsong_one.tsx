import { Component } from 'react';
import { Button } from 'reactstrap';
import * as Tone from 'tone';
const { DRUM1 } = require("./assets/01-drum.mp3");

export interface GridSongOneProps {
    token?: string | null;
}
 
export interface GridSongOneState {
    isLoaded: boolean;
}

class GridSongOne extends Component <GridSongOneProps, GridSongOneState> {
  constructor(props: GridSongOneProps) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    Tone.Transport.start();
    Tone.Transport.bpm.value = 116;
    const buffer = new Tone.ToneAudioBuffer(DRUM1, () => {
	console.log("loaded");
    });
  }

  handleClickOne = () => {
    const player = new Tone.Player(DRUM1).toDestination();
    Tone.loaded().then(() => {
	player.start();
    });
  }

  handleClickTwo = () => {
    const player = new Tone.Player("https://tonejs.github.io/audio/salamander/C4.mp3").toDestination();
    Tone.loaded().then(() => {
	player.start();
    });
  }

  handleClickThree = () => {
    const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
    Tone.loaded().then(() => {
	player.start();
    });
  }

  render() {
    return (
      <div>
        <Button className="btn btn-outline-light" onClick={this.handleClickOne}>
          Start
        </Button>
        <Button className="btn btn-outline-light" onClick={this.handleClickTwo}>
          Start
        </Button>
        <Button className="btn btn-outline-light" onClick={this.handleClickThree}>
          Start
        </Button>
      </div>
    );
  }
}
 
export default GridSongOne;