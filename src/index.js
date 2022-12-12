import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';

const sounds = [
    {
        letter: 'q',
        file: './Heater-1.mp3',
        name: 'Heater 1'
    },
    {
        letter: 'w',
        file: './Heater-2.mp3',
        name: 'Heater 2'
    }, 
    {
        letter: 'e',
        file: './Heater-3.mp3',
        name: 'Heater 3'
    },
    {
        letter: 'a',
        file: './Heater-4.mp3',
        name: 'Heater 4'
    },
    {
        letter: 's',
        file: './Clap.mp3',
        name: 'Clap'
    },
    {
        letter: 'd',
        file: './Open-HH.mp3',
        name: 'Open HH'
    },
    {
        letter: 'z',
        file: './Kick_n_Hat.mp3',
        name: 'Kick n\' Hat'
    },
    {
        letter: 'x',
        file: './Kick.mp3',
        name: 'Kick'
    },
    {
        letter: 'c',
        file: './Closed-HH.mp3',
        name: 'Closed HH'
    }
];

class Drum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'Display',
            sliderValue: '30',
        };
        this.play = this.play.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.borderUp = this.borderUp.bind(this);
        this.handleSlider = this.handleSlider.bind(this);
    }
    
    play(str) {
        document.getElementById(str).play();
        let ind = sounds.findIndex((element) => element.letter == str);
        this.setState({
            display: sounds[ind].name,
        });
    };

    handlePress(event) {
        document.getElementById(event.key).play();
        let ind = sounds.findIndex((element) => element.letter == event.key);
        this.setState({
            display: sounds[ind].name,
        });
        let button = document.getElementById(sounds[ind].name);
        button.style.border = '3px solid #1F0459';
        button.style.color = '#2F0787';
        button.style.backgroundColor = '#F6F754';
    };

    borderUp(event) {
        let ind = sounds.findIndex((element) => element.letter == event.key);
        let button = document.getElementById(sounds[ind].name);
        button.style = document.querySelector('button');
    };

    handleSlider(event) {
        let clips = document.getElementsByClassName('clip');
        for (let i = 0; i < clips.length; i++) {
            clips[i].volume = event.target.value / 100;
        }
        this.setState({
            sliderValue: event.target.value,
            display: 'Volume: ' + event.target.value + '%',
        });
    };
    
    componentDidMount() {
        document.addEventListener('keydown', this.handlePress);
        document.addEventListener('keyup', this.borderUp);
    };
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlePress);
        document.removeEventListener('keyup', this.borderUp);
    };

    render() {
        return (
            <div id='container'>
                <div id='drum-machine'>
                    {sounds.map((sound, index) => (
                        <button onClick={() => this.play(sound.letter)} key={index} id={sound.name}>
                            {sound.letter.toUpperCase()}
                            <audio src={sound.file} className='clip' id={sound.letter}></audio>
                        </button>
                    ))}
                </div>
                <div id='display'>
                    <p id='track-name'>{this.state.display}</p>
                    <br />
                    <p className='labels'>VOLUME CONTROL:</p>
                    <input type='range' id='volume-slider' min='0' max='100' step='1' value={this.state.sliderValue} onChange={this.handleSlider}></input>
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Drum />);