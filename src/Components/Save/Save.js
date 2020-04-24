import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ClipLoader from "react-spinners/ClipLoader";
import ApiRequester from "../../Core/ApiRequester";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     width: 280,
//     height: 160,
//     float: "right",
//   },
//   paper: {
//     padding: 12,
//     height: 40,
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     border: "1px solid",
//   },
//   paragraf: {
//     margin: 0,
//   },
// }));

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

  componentDidMount(){
    this.requestDate();
  }

  requestDate() {
    return this.apirequester.getDate().then((d) => {
      this.setState({date:`${d.getDay()}.${d.getMonth()}.${d.getFullYear()}r.`})
      console.log(this.state)
    });
  }

  change() {
    this.setState({buttonState: !this.state.buttonState });
  }

  render() {  
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper >
              <p >Last Snapshot:</p>
              <p >{this.state.date}</p>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper >
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
            <Paper >
              <ColorButton
                variant="contained"
                color="primary"
                
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
