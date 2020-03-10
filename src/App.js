import React, { Component } from 'react';

import fire from './config/Fire';
import Header from './components/Header';
import Transition from './pages';
import Routes from './routes';

import "./styles.css";


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user : {}
    }
  }

  componentDidMount(){
    this.authListener();
  }
  
  authListener () {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
      } else {
        this.setState ({ user: null });
      }
    });
    }
    render() {
      return (
        <div className = "App">
        <Header/>
        {this.state.user ? (<Routes />) : (<Transition/>)}
        </div>
      )
    }
}

export default App;
