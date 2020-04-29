import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";
import ApiRequester from "../../Core/ApiRequester";
import './Server.css';

const ColorButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#7986cb",
    border: "2px solid black",
    "&:hover": {
      backgroundColor: "#5c6bc0",
    },
    width: "150px",
  },
}))(Button);

export default class LeftGrid extends React.Component {
  
  state = {serverState:false}

  constructor(props){
    super(props);

    this.apirequester = new ApiRequester("http://92.222.93.208:3000");
  }

  componentDidMount(){
    this.getServerState();
  }

  getServerState(){
    this.apirequester.isSeverUp().then((response)=>{this.setState({serverState:response.data})});
  }

  switch(){
    if(this.state.serverState==false){
      this.apirequester.startServer(this.props.password).then(()=>{this.getServerState()});
    }
    else{
      this.apirequester.stopServer(this.props.password).then(()=>{this.getServerState()});
    }
        
  }

  render(){
    return (
      <div className='rooty'>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className='containery'>
              {this.state.serverState ? "Serwer up" : "Serwer down"}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className='containery'>
              <Switch
                checked={this.state.serverState}
                onChange={() => {
                  this.switch();
                }}
                name="checkedA"
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
}
}