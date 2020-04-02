import * as React from 'react';
import { Table } from 'react-bootstrap';

import './SimulationTable.scss';
import Rocket from '../Rocket/Rocket';
import Sun from '../Sun/Sun';
import Starfield from '../Starfield/Starfield';

class SimulationTable extends React.Component<any, any> {

    render() {
        return (
            <div id="simulation-table">
                <h1>Space Simulation {this.props.simulationNumber}</h1>
                <Table striped bordered hover className="space-state">
                    <tbody>
                        <tr>
                            <td><Rocket></Rocket></td>
                            <td><Sun></Sun></td>
                            <td><Starfield></Starfield></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default SimulationTable;