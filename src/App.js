import React, { Component } from 'react';
import {InformationDisplayer, CreateOneItemForm} from 'michelle-generic-react-components';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joyfulThings: []
    };
  }
  componentDidMount() {
    axios.get("https://joyfulthings.herokuapp.com/joyful_things").then((res) => {
      this.setState({
        joyfulThings: res.data
      });
    });
  }
  addNewJoyfulThing(thing) {
    this.setState(oldState => {
      let oldThings = oldState.joyfulThings;
      oldThings.push(thing);
      return {joyfulThings: oldThings}
    });
  }
  render() {
    let joyfulHtml = this.state.joyfulThings.map((joyfulThing, i) => (
      <InformationDisplayer information={`${i + 1}. ${joyfulThing.name}`} key={joyfulThing.id} />
    ));
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Joyful Things</h1>
        </header>
        <CreateOneItemForm inputName="name" submitURL="https://joyfulthings.herokuapp.com/joyful_things" afterSubmitted={ (data) => this.addNewJoyfulThing(data)} />
        {joyfulHtml}
      </div>
    );
  }
}

export default App;
