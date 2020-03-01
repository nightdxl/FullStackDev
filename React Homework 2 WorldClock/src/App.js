import React from 'react';

import './App.css';

// import SignUpForm from './SignUpForm.js'
import Clock from './Clock.js'

// functional component
// assemble welcome component
function App() {
  return (

    <div className="App">
      <Clock city='syd'/>
      <Clock city='shan'/>
      <Clock city='bri'/>
      <Clock city='uru'/>
      <Clock city='mex'/>
      <Clock city='new y'/>
      <Clock city='ice'/>
      <Clock city='a'/>
      <Clock city='b'/>
      <Clock city='c'/>
    </div>
    
  );
}
export default App;
