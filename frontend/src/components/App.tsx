import React from 'react';
import './App.css';
import HomeComponent from './Home';
import SetupComponent from './Setup';
import Simulation from './Simulation/Simulation';
import history from './history';
import { Container } from 'react-bootstrap';
import { Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomeComponent} />
        <Route path="/Setup" exact component={SetupComponent} />
        <Route path="/Simulation" exact component={Simulation} />

        {/*
        <Container>
          <main>
            <SimulationTable simulationNumber="1"></SimulationTable>
          </main>
        </Container>
      */}

      </Switch>
    </Router>
  );
}

export default App;
