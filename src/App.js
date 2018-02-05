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
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/joyful_things`).then((res) => {
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
          <h1 className="App-title">Joyful Things {process.env.REACT_APP_BACKEND_URL}</h1>
        </header>
        <CreateOneItemForm inputName="name" submitURL={process.env.REACT_APP_BACKEND_URL+ "/joyful_things"} afterSubmitted={ (data) => this.addNewJoyfulThing(data)} />
        {joyfulHtml}
      </div>
    );
  }
}

export default App;
