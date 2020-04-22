import React from 'react';
import './App.css';
import Server from './Components/Server/Server'
import Save from './Components/Save/Save'
import TextField from '@material-ui/core/TextField';

function App() {
  return (
    <div className="MainComponent">
      <Server/>
      <Save/>
      <div><TextField id="outlined-basic" label="Hasło" variant="outlined" /></div>
    </div> 
      );
}

export default App;
