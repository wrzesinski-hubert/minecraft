import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ClipLoader from "react-spinners/ClipLoader";
import ApiRequester from "../../Core/ApiRequester";
import './Save.css';


const ColorButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#7986cb",
    border: "2px solid black",
    "&:hover": {
      backgroundColor: "#5c6bc0",
    },
    width: "100px",
  },
}))(Button);


export default class RightGrid extends React.Component {
  constructor(props,context) {
    super(props,context);

    this.apirequester = new ApiRequester("http://92.222.93.208:3000");

    this.state = {
      buttonState: true,
      date: '',
    };
  }

  getSnapshotState(){
    this.apirequester.isSnapshotReady().then((result)=>{
      this.setState({buttonState:!result});
      console.log(this.state.buttonState);
    });
  }


  componentDidMount(){
    this.requestDate();
    this.getSnapshotState();
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (prevState.buttonState!=this.state.buttonState && this.state.buttonState==true){
      this.interval=setInterval(()=>this.getSnapshotState(),5000);
    }
    if (prevState.buttonState!=this.state.buttonState && this.state.buttonState==false){
      clearInterval(this.interval);
      this.requestDate();
    }
  }

  requestDate() {
    return this.apirequester.getDate().then((d) => {
      this.setState({date:`${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}r.`})
    });
  }

  change() {
    this.apirequester.createSnapshot().then(()=>{this.getSnapshotState()});
  }

  download(){
    if(this.state.buttonState==false)
    {
      this.apirequester.download();
      
    }
  }

  render() {  
    return (
      <div className="root">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className="container">
              <p className="paragraf">Last Snapshot:</p>
              <p className="paragraf">{this.state.date}</p>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="container">
              <ColorButton
                variant="contained"
                color="primary"
                
                onClick={() => this.change()}
              >
                Nowy
              </ColorButton>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className="container">
              <ColorButton
                variant="contained"
                color="primary"
                onClick={()=> this.download()}
              >
                
                {!this.state.buttonState ? "Pobierz" : ""}
                <ClipLoader size={20} color={"#123abc"} loading={this.state.buttonState} />
              </ColorButton>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
