import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:200,
    height:160,
    float:'left'
  },
  paper: {
    padding: 12,
    height:40,
    textAlign: 'center',
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
    width:'150px'
  },
}))(Button);

export default function LeftGrid() {
  const classes = useStyles();
  const [state, changeState] = useState(true);

  function change(){
    changeState(state=>!state)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
        <Paper className={classes.paper}>{ state ? 'Serwer up' : 'Serwer down'}</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ColorButton variant="contained" color="primary" className={classes.margin} onClick={change}>
            Włącz/Wyłącz
            </ColorButton>
            </Paper>
        </Grid>
      </Grid>
    </div>
  );
}


