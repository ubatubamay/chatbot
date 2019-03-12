import React from 'react';
import './app.scss';
import Presentation from './components/Presentation';

class App extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <Presentation/>
    );
  }
}

export default App;