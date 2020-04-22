import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from 'react';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 280,
    height:160,
    float: "right"
  },
  paper: {
    padding: 12,
    height:40,
    textAlign: "center",
    color: theme.palette.text.secondary,
    border:"1px solid"
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#7986cb",
    border:'2px solid black',
    '&:hover': {
      backgroundColor: "#5c6bc0",
    },
    width:'100px'
  },
}))(Button);



export default function RightGrid() {
  const classes = useStyles();
  const [state, changeState] = useState(true);
  
  function change(){
    changeState(state=>!state)
    axios.get(`http://92.222.93.208:3000/save/snapshot/last`)
      .then(res => {
        const persons = res.data;
        console.log(persons)
      })
  }



  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Last Snapshot:
          
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><ColorButton variant="contained" color="primary" className={classes.margin} onClick={change}>Nowy</ColorButton></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><ColorButton variant="contained" color="primary" className={classes.margin}>
          {!state? 'Pobierz':''}
          <ClipLoader
          size={20}
          color={"#123abc"}
          loading={state}
        />
        </ColorButton></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
