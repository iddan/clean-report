import React, { Component } from 'react';
import styled from 'styled-components';
import ReactCountdownClock from 'react-countdown-clock';
import Recorder from 'react-recorder';

import trash from './icons/trash.svg';
import toiletPaper from './icons/toilet-paper.svg';
import liquidSoap from './icons/liquid-soap.svg';
import toilet from './icons/toilet.svg';

import happy from './icons/happy.svg';
import confused from './icons/confused.svg';
import yelling from './icons/yelling.svg';

import microphone from './icons/microphone.svg';

const StyledApp = styled.div`
  max-width: 75vh;
  overflow: hidden;
  direction: rtl;
  font-family: Rubik;
  font-weight: 900;


  p {
    text-align: center;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Tile = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin: .25em;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all .25s;
  background: white;

  &:active {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  img {
    width: 60%;
  }

  span {
    padding: 2em 0 0;
  }

  ${({ selected, background }) => selected && `
    background: ${ background };
  `}
`;

const Button = styled.button`
  background: #18FFFF;
  color: black;
  border: none;
  font: inherit;
  font-size: 2rem;
  padding: .5rem 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin: 1rem;

  &:active {
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  &[disabled] {
    background: #eee;
    color: grey;
  }
`;

const MicrophoneIcon = styled.img`
  width: 6rem !important;
`;

const cell = prompt('הקלד.י את מיקום תא השירותים');

class App extends Component {

  state = {
    selectedSmallTile: null,
    smallTiles: [],
    largeTIle: null,
  };

  setSmallTile = (tile) => () => {
    this.setState(state => ({
      ...state,
      smallTiles: state.smallTiles.includes(tile)
        ? state.smallTiles.filter(smallTile => smallTile !== tile)
        : state.smallTiles.concat(tile),
    }));
  }

  setLargeTile = (tile) => () => {
    this.setState({ largeTile: tile });
  }

  render() {
    const { smallTiles, largeTile } = this.state;
    return (
      <StyledApp>
        <p>בעיות (בחר.י אחת או יותר אם יש)</p>
        <Row>
          <Tile background="#80DEEA" selected={ smallTiles.includes('Trash is Full') } onClick={ this.setSmallTile('Trash is Full') }>
            <img alt="" src={ trash } />
            <span>פח מלא</span>
          </Tile>                
          <Tile background="#80DEEA" selected={ smallTiles.includes('Missing Toilet Paper') } onClick={ this.setSmallTile('Missing Toilet Paper') }>
            <img alt="" src={ toiletPaper } />
            <span>חסר נייר טואלט</span>
          </Tile>                
          <Tile background="#80DEEA" selected={ smallTiles.includes('Missing Soap') } onClick={ this.setSmallTile('Missing Soap') }>
            <img alt="" src={ liquidSoap } />
            <span>חסר סבון</span>
          </Tile>                
          <Tile background="#80DEEA" selected={ smallTiles.includes('Problem with the Toilet') }
                onClick={ this.setSmallTile('Problem with the Toilet') }>
            <img alt="" src={ toilet } />
            <span>בעיה באסלה</span>
          </Tile>
        </Row>   
        <p>מצב השירותים (בחר.י אחד)</p>
        <Row>
          <Tile background="#00E676" selected={ largeTile === 'good' } onClick={ this.setLargeTile('good') }>
            <img src={ happy } style={{ width: '100%' }} />
            <span>מצב תקין</span>
          </Tile>
          <Tile background="#FFFF8D" selected={ largeTile === 'medium' } onClick={ this.setLargeTile('medium') }>
            <img src={ confused } style={{ width: '100%' }} />
            <span>המצב סביר</span>
          </Tile>
          <Tile background="#FF5252" selected={ largeTile === 'bad' } onClick={ this.setLargeTile('bad') }>
            <img src={ yelling } style={{ width: '100%' }} />
            <span>מצב בכי רע</span>
          </Tile>
        </Row>
        <Row>
            <Button disabled={ !(this.state.largeTile || this.state.smallTiles.length) }
                    onClick={ () => {
                      this.setState({
                        selectedSmallTile: null,
                        smallTiles: [],
                        largeTile: null
                      });
                      window.emailjs.send('gmail', 'template_kGJ4Ohy9', {
                        cell,
                        mood: this.state.largeTile,
                        problem: this.state.smallTiles.join(', '),
                      });
                    } }>שליחה</Button>
        </Row>
      </StyledApp>
    );
  }
}

export default App;
