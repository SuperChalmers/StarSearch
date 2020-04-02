import React from 'react';
import './App.css';

import SimulationTable from './SimulationTable/SimulationTable';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <main>
          <SimulationTable simulationNumber="1"></SimulationTable>
        </main>
      </Container>
    </div>
  );
}

export default App;
