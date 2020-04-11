import * as React from 'react';
import * as _ from 'lodash';
import { Table, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';

import './Simulation.scss';
import SpaceEntity from '../SpaceEntity';
import * as SimulationRequest from '../../requests/Simulation';
import { convertSimulationResponse } from '../../helper/helpers';
import { Simulation as SimulationModel } from '../../Models';

class Simulation extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            safeSquares: '',
            exploredSquares: '',
            turnsTaken: '',
            simulation: {}
        };
    }

    async componentDidMount() {
        var simulation = await this.updateSimulationState();

        this.setState({
            simulation: simulation
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(this.state.simulation, prevState.simulation)) {
            this.updateSimulationState();
        }
    }

    updateSimulationState = async () => {
        // Stub for rest request.
        var stub = {
            id: "123",
            height: 2,
            width: 3,
            drones: [
                {
                    droneID: "d0",
                    orientation: "N",
                    coordinates: {
                        width: 2,
                        height: 1
                    },
                    strategy: 0,
                    fuel: 0
                },
                {
                    droneID: "d1",
                    orientation: "SE",
                    coordinates: {
                        width: 1,
                        height: 1
                    },
                    strategy: 0,
                    fuel: 1
                }
            ],
            spaceMap: [
                {
                    coordinates: {
                        width: 0,
                        height: 0
                    },
                    contents: "STARS",
                    drone: false,
                    isExplored: true,
                    isKnown: true
                },
                {
                    coordinates: {
                        width: 1,
                        height: 0
                    },
                    contents: "STARS",
                    drone: false,
                    isExplored: false,
                    isKnown: true
                },
                {
                    coordinates: {
                        width: 2,
                        height: 0
                    },
                    contents: "STARS",
                    drone: false,
                    isExplored: false,
                    isKnown: false
                },
                {
                    coordinates: {
                        width: 0,
                        height: 1
                    },
                    contents: "EMPTY",
                    drone: false,
                    isExplored: false,
                    isKnown: false
                },
                {
                    coordinates: {
                        width: 1,
                        height: 1
                    },
                    contents: "DRONE",
                    drone: true,
                    isExplored: true,
                    isKnown: false
                },
                {
                    coordinates: {
                        width: 2,
                        height: 1
                    },
                    contents: "DRONE",
                    drone: true,
                    isExplored: true,
                    isKnown: false
                }
            ]
        }

        var simulationArray = convertSimulationResponse(stub);

        return new SimulationModel(stub.id, simulationArray);
    }

    handleNextTurn = async () => {
        // Get next state from the server.
        var newSimulationState = await SimulationRequest.nextStep();
        this.setState({
            simulation: newSimulationState
        });
    }

    handleStopSimulation = async () => {
        await SimulationRequest.halt(this.state.id);
    }

    displayText(text: any) {
        return (
            <div>
                {text}
            </div>
        )
    }

    renderSpaceTable = () => {
        let table: any[] = []

        // Only render if there is stuff to render.
        if (this.state.simulation.space &&
            this.state.simulation.space.area &&
            this.state.simulation.space.area.length) {

            var height = this.state.simulation.space.height();
            var width = this.state.simulation.space.width();

            // Rows
            for (var rowIndex = 0; rowIndex < height; rowIndex++) {
                let columns: any[] = [];

                // Columns
                for (var columnIndex = 0; columnIndex < width; columnIndex++) {
                    var spaceEntity = this.state.simulation.space.get(columnIndex, rowIndex);

                    if (columnIndex === 0) {
                        columns.push(
                            <td key={`${rowIndex}-row-${columnIndex}-column-index`}>{Math.abs(rowIndex - height)}</td>
                        )
                    }

                    columns.push(
                        <td key={`${rowIndex}-row-${columnIndex}-column`}>
                            <SpaceEntity
                                direction={spaceEntity.direction}
                                type={spaceEntity.type}
                                active={spaceEntity.active}
                                status={spaceEntity.status}
                                explored={spaceEntity.explored}
                                known={spaceEntity.known}
                                fuel={spaceEntity.fuel}>
                            </SpaceEntity>
                        </td>
                    )
                }
                table.push(<tr key={rowIndex + "-row"}>{columns}</tr>)
            }

            let indexColumns: any[] = [];
            for (var columnIndex = 0; columnIndex < width + 1; columnIndex++) {
                indexColumns.push(<td key={`${rowIndex}-row-${columnIndex}-column-index`}>{columnIndex}</td>);
            }

            table.push(<tr key={rowIndex + "-row"}>{indexColumns}</tr>)
        }

        return table;
    }

    render() {
        return (
            <div className="page">
                <div className="blockTable">
                    <div id="simulation-table">
                        <h1>Space Simulation {this.props.simulationNumber}</h1>

                        <Table bordered className="space-state">
                            <tbody>
                                {this.renderSpaceTable()}
                            </tbody>
                        </Table>
                    </div>
                </div>

                <div className="blockActions">
                    <div className="colAction">
                        <Button size="lg" className="button" onClick={this.handleNextTurn} >
                            NEXT TURN
                        </Button>
                        <Button size="lg" className="button" onClick={this.handleStopSimulation}>
                            STOP
                        </Button>
                    </div>
                    <div className="colReport" >
                        <div className="reportHeader">
                            {this.displayText("Width : ")}
                            {this.displayText("Height : ")}
                            {this.displayText("Safe Squares : ")}
                            {this.displayText("Explored Squares : ")}
                            {this.displayText("Turns Taken : ")}
                        </div>
                        <div className="reportValues">
                            {this.displayText(this.state.simulation.width)}
                            {this.displayText(this.state.simulation.height)}
                            {this.displayText(this.state.simulation.safeSquares)}
                            {this.displayText(this.state.simulation.exploredSquares)}
                            {this.displayText("TODO")}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Simulation;