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
                <Table bordered className="space-state">
                    <tbody>
                        <tr>
                            <td><Rocket direction="north" active={false}></Rocket></td>
                            <td><Sun></Sun></td>
                            <td><Starfield></Starfield></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><Rocket direction="south" active={true}></Rocket></td>
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