import * as React from 'react';
import { Table, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';

import './Simulation.scss';
import Rocket from '../Rocket/Rocket';
import Sun from '../Sun/Sun';
import Starfield from '../Starfield/Starfield';

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
            turnsTaken: ''
        };
    }

    handleActionChange = (event: any) => {
        const target = event.target;
        const action = target.name;

        this.setState({
            ["action"]: action
        });
    }

    handleStopSimulation = () => {
        // TODO: function to stop simulation 
    }

    displayText(props: any) {
        return (
            <div className="text">
                {props.text}
            </div>
        )
    }

    render() {
        return (
            <div className="page">
                <div className="blockTable">
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