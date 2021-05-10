import './App.css';
import Header from "./components/Header";
import VotePanel from "./components/VotePanel";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <div className="App">
        <Grid container spacing={1}>
            <Grid  item xs={12} >
                <Header/>
            </Grid>
            <Grid  item xs={12} sm={12} spacing={3} >
                <VotePanel />
            </Grid>
        </Grid>

    </div>
  );
}

export default App;
