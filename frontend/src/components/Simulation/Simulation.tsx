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

    handleActionChange = (event: any) => {
        const target = event.target;
        const action = target.name;

        this.setState({
            ["action"]: action
        });
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
        if(this.state.simulation.space) {
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
                    <div className="colActionInput">
                        <DropdownButton
                            id="thrustDistance"
                            size="lg"
                            className="button"
                            title={this.state.selectedDistance}
                            onSelect={(e: any) => { this.setState({ selectedDistance: e }) }}
                        >
                            <Dropdown.Item eventKey="1">1</Dropdown.Item>
                            <Dropdown.Item eventKey="2">2</Dropdown.Item>
                            <Dropdown.Item eventKey="3">3</Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton
                            id="steerDirection"
                            size="lg"
                            className="button"
                            title={this.state.selectedDirection}
                            onSelect={(e: any) => { this.setState({ selectedDirection: e }) }}
                        >
                            <Dropdown.Item eventKey="North">North</Dropdown.Item>
                            <Dropdown.Item eventKey="NorthEast">NorthEast</Dropdown.Item>
                            <Dropdown.Item eventKey="East">East</Dropdown.Item>
                            <Dropdown.Item eventKey="SouthEast">SouthEast</Dropdown.Item>
                            <Dropdown.Item eventKey="South">South</Dropdown.Item>
                            <Dropdown.Item eventKey="SouthWest">SouthWest</Dropdown.Item>
                            <Dropdown.Item eventKey="West">West</Dropdown.Item>
                            <Dropdown.Item eventKey="NorthWest">NorthWest</Dropdown.Item>
                        </DropdownButton>

                    </div>
                    <div className="colAction">
                        <Button name="thrust" size="lg" className="button" onClick={this.handleActionChange} >
                            THRUST
                        </Button>
                        <Button name="steer" size="lg" className="button" onClick={this.handleActionChange}>
                            STEER
                        </Button>
                        <Button name="scan" size="lg" className="button" onClick={this.handleActionChange}>
                            SCAN
                        </Button>
                        <Button name="pass" size="lg" className="button" onClick={this.handleActionChange}>
                            PASS
                        </Button>
                    </div>
                    <div className="colStop">
                        <Button size="lg" className="buttonStop" onClick={this.handleStopSimulation}>
                            STOP SIMULATION
                        </Button>

                        <Form.Check
                            name="autoDecision"
                            type="checkbox"
                            className="checkBox"
                            label="Automatic Decision"
                            checked={this.state.autoDecision}
                            onChange={(e: any) => { this.setState({ autoDecision: !this.state.autoDecision }) }}
                        />

                        <div className="report" >
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
            </div>
        );
    }
}

export default Simulation;