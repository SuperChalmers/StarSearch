import * as React from 'react';
import { Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import history from './../history';
import './index.scss';
import { createSimulation } from '../../requests';

export default class SetupComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedScenarioFile: 'Select Scenario File',
            chargeRate: 1,
            fuelCapacity: 1,
            gallonsPerThrust: 1,
            gallonsPerSteer: 1,
            gallonsPerScan: 1,
            gallonsPerPass: 1,
        };
    }

    handleFileChange = (event: any) => {
        var validFile = (typeof event.target.files[0] !== 'undefined');

        if (validFile) {
            const fileName = event.target.files[0].name;

            this.setState({
                selectedScenarioFile: fileName
            })
        }
    }

    handleStartSimulation = async () => {
        var createdSimulation = await createSimulation({
            name: "Simulation",
            secondsDelay: this.state.secondsDelay,
            scenarioFile: this.state.selectedScenarioFile,
            strategy: 0,
            chargeMethod: this.state.chargeMethod,
            chargeRate: this.state.chargeRate,
            fuel: this.state.fuel,
            gallonsPerThrust: this.state.gallonsPerThrust,
            gallonsPerSteer: this.state.gallonsPerSteer,
            gallonsPerScan: this.state.gallonsPerScan,
            gallonsPerPass: this.state.gallonsPerPass
        });

        await history.push('/Simulation', { simulation: createdSimulation });
    }

    displayText(props: any) {
        return (
            <div className="colRight">
                {props.text}
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="block">
                    SETUP


                    <div className="row">
                        <div className="colLeft">
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={this.state.chargeRate}
                                onSelect={(e: any) => { this.setState({ chargeRate: e }) }}
                            >
                                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <this.displayText text="charge rate (gallons per turn)" />
                    </div>


                    <div className="row">
                        <div className="colLeft">
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={this.state.fuelCapacity}
                                onSelect={(e: any) => { this.setState({ fuelCapacity: e }) }}
                            >
                                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <this.displayText text="fuel (gallons)" />
                    </div>


                    <div className="row">
                        <div className="colLeft">
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={this.state.gallonsPerThrust}
                                onSelect={(e: any) => { this.setState({ gallonsPerThrust: e }) }}
                            >
                                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <this.displayText text="gallons per THRUST (each step)" />
                    </div>


                    <div className="row">
                        <div className="colLeft">
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={this.state.gallonsPerSteer}
                                onSelect={(e: any) => { this.setState({ gallonsPerSteer: e }) }}
                            >
                                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <this.displayText text="gallons per STEER (any direction)" />
                    </div>


                    <div className="row">
                        <div className="colLeft">
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={this.state.gallonsPerScan}
                                onSelect={(e: any) => { this.setState({ gallonsPerScan: e }) }}
                            >
                                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <this.displayText text="gallons per SCAN" />
                    </div>


                    <div className="row">
                        <div className="colLeft">
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={this.state.gallonsPerPass}
                                onSelect={(e: any) => { this.setState({ gallonsPerPass: e }) }}
                            >
                                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <this.displayText text="gallons per PASS" />
                    </div>

                    <div className="row">
                        <div className="colRight">
                            <Form>
                                <Form.File
                                    id="selectScenario"
                                    accept=".txt"
                                    label={this.state.selectedScenarioFile}
                                    onChange={this.handleFileChange}
                                    custom
                                />
                            </Form>
                        </div>
                    </div>

                </div>

                <div className="block">
                    <div className="row">
                        <Button size="lg" onClick={this.handleStartSimulation}>
                            START
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
