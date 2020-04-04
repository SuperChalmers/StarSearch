import React from 'react';
import './App.css';
import SimulationTable from './SimulationTable/SimulationTable';
import Home from './Home/Home';
import Setup from './Setup/Setup';
import history from './history';
import { Container } from 'react-bootstrap';
import { Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Setup" exact component={Setup} />
        <Route path="/Simulation" exact component={SimulationTable} />

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
