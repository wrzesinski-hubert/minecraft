import './App.css';
import Server from './Components/Server/Server'
import Save from './Components/Save/Save'
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

function App() {
  const [passwd, setPasswd] = useState('');

  return (
    <div className="MainComponent">
      <Server password={passwd}/>
      <Save/>
      <div><TextField id="outlined-basic" label="Hasło" variant="outlined" type="password" onChange={(e)=>{setPasswd(e.target.value)}}/></div>
    </div> 
      );
}

export default App;
