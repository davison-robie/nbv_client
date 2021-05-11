import { Component } from 'react';
// import { Button } from 'reactstrap';
import * as Tone from 'tone';

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

  startApp = () => {
    Tone.Transport.start();
    Tone.Transport.bpm.value = 116;
    this.setState({ isLoaded: true })
  }

  // feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();

  handleClickUno = () => {
    let pingPongDelay = new Tone.PingPongDelay(0.25, 0.5).toDestination();
    const sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/casio/",
      onload: () => {
        sampler.triggerAttackRelease(["D3"], 3);
        sampler.triggerAttackRelease(["G4"], 3);
      }
    }).connect(pingPongDelay);
  }


  handleClickTwo = () => {
    let pingPongDelay = new Tone.PingPongDelay(0.25, 0.5).toDestination();
    const sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/casio/",
      onload: () => {
        sampler.triggerAttackRelease(["C3"], 3);
        sampler.triggerAttackRelease(["Bb3"], 3);
      }
    }).connect(pingPongDelay);
  }

  handleClickThree = () => {
    let pingPongDelay = new Tone.PingPongDelay(0.25, 0.5).toDestination();
    const sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/casio/",
      onload: () => {
        sampler.triggerAttackRelease(["Eb3"], 3);
        sampler.triggerAttackRelease(["G2"], 3);
      }
    }).connect(pingPongDelay);
  }
  handleClickFour = () => {
    const sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/casio/",
      onload: () => {
        sampler.triggerAttackRelease(["Eb2"], 3);
        sampler.triggerAttackRelease(["Bb0"], 3);
      }
    }).toDestination();
  }

  handleClickFive = () => {
    const sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/casio/",
      onload: () => {
        sampler.triggerAttackRelease(["G0"], 3);
        sampler.triggerAttackRelease(["Eb2"], 3);
        sampler.triggerAttackRelease(["C0"], 3);
      }
    }).toDestination();
  }

  handleClickSix = () => {
    const sampler = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/casio/",
      onload: () => {
        sampler.triggerAttackRelease(["F1"], 3);
        sampler.triggerAttackRelease(["Ab0"], 3);
      }
    }).toDestination();
  }

  render() {
    return (
      <div className="musicAppContainer">
        { !this.state.isLoaded ?
            <button className="startApp" onClick={this.startApp}>Play!</button>
          :
          <div>
            <br />
            <button className="pixie" onClick={this.handleClickUno}>V</button>
            <button className="pixie" onClick={this.handleClickTwo}>B</button>
            <button className="pixie" onClick={this.handleClickThree}>N</button>
            <br />
            <br />
            <br />
            <br />
            <button className="orb" onClick={this.handleClickFour}></button>
            <button className="orb" onClick={this.handleClickFive}></button>
            <button className="orb" onClick={this.handleClickSix}></button>
          </div>
          
        }
      </div>
    );
  }
}
 
export default GridSongOne;