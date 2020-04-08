import * as React from 'react';
import { Table, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';

import './Simulation.scss';
import Rocket from '../Rocket/Rocket';
import Sun from '../Sun/Sun';
import Starfield from '../Starfield/Starfield';
import * as SimulationRequest from '../../requests/Simulation';
import { convertSimulationResponse } from '../../helper/helpers';
import { Simulation as SimulationModel } from '../../Models/Simulation';

class Simulation extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            action: '',
            selectedDirection: 'Direction',
            selectedDistance: 'Distance',
            autoDecision: false,
            width: '',
            height: '',
            safeSquares: '',
            exploredSquares: '',
            turnsTaken: '',
            simulation: {}
        };
    }

    // componentDidUpdate() {
    //     this.updateSimulationState();
    // }

    componentDidMount() {
        this.updateSimulationState();
    }

    updateSimulationState = async () => {
        // Stub for rest request.
        var stub = {
            id: "123",
            height: 4,
            width: 5,
            drones: [
                {
                    droneID: "d0",
                    orientation: "N",
                    coordinates: {
                        width: 1,
                        height: 2
                    },
                    strategy: 0
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
                    isExplored: false,
                    isKnown: false
                },
                {
                    coordinates: {
                        width: 0,
                        height: 1
                    },
                    contents: "STARS",
                    drone: false,
                    isExplored: false,
                    isKnown: false
                },
                {
                    coordinates: {
                        width: 1,
                        height: 1
                    },
                    contents: "STARS",
                    drone: false,
                    isExplored: false,
                    isKnown: false
                },
                {
                    coordinates: {
                        width: 1,
                        height: 0
                    },
                    contents: "STARS",
                    drone: false,
                    isExplored: false,
                    isKnown: false
                }
            ]
        }

        var simulationArray = convertSimulationResponse(stub);
        var simulation = new SimulationModel(stub.id, simulationArray)
        this.setState({
            simulation: simulation
        })
    }

    handleNextTurn = () => {
        // TODO: trigger request
    }

    handleStopSimulation = async () => {
        await SimulationRequest.halt(this.state.id);
    }

    displayText(props: any) {
        return (
            <div className="text">
                {props.text}
            </div>
        )
    }

    render() {
        const spaceGrid = [];
        if (this.state.simulation.space) {
            for (var rowIndex = 0; rowIndex < this.state.simulation.space.height() - 1; rowIndex++) {
                let items = [];

                // for (var columnIndex = 0; columnIndex < this.state.simulation.space.width() - 1; columnIndex++) {
                //     this.state.simulation.space.get(columnIndex, rowIndex)
                //     if(columnIndex = 0) {
                //         items.push(<td key={columnIndex}>{rowIndex}</td>)
                //     }
                //     items.push(<td key={columnIndex + 1}>f</td>)
                // }

                // spaceGrid.push(<tr key={rowIndex}>{items}</tr>)
                // if(rowIndex == this.state.simulation.space.height() - 1) {
                //     spaceGrid.push(<tr key={rowIndex}></tr>)
                // }
            }
        }

        return (
            <div className="page">
                <div className="blockTable">
                    <div id="simulation-table">
                        <h1>Space Simulation {this.props.simulationNumber}</h1>
                        <Table bordered className="space-state">
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><Rocket direction="north" active={false}></Rocket></td>
                                    <td><Sun></Sun></td>
                                    <td><Starfield></Starfield></td>
                                </tr>
                                <tr>
                                    <td>0</td>
                                    <td><Rocket direction="south" active={true}></Rocket></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>2</td>
                                </tr>
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
                            <this.displayText text="Width : " />
                            <this.displayText text="Height : " />
                            <this.displayText text="Safe Squares : " />
                            <this.displayText text="Explored Squares : " />
                            <this.displayText text="Turns Taken : " />
                        </div>
                        <div className="reportValues">
                            <this.displayText text={this.state.width} />
                            <this.displayText text={this.state.height} />
                            <this.displayText text={this.state.safeSquares} />
                            <this.displayText text={this.state.exploredSquares} />
                            <this.displayText text={this.state.turnsTaken} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Simulation;