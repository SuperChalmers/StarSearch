import * as React from 'react';
import { Button, Form, Dropdown, DropdownButton, FormControl } from 'react-bootstrap';
import history from './../history';
import './Setup.scss';
import { isUndefined } from 'util';

class Setup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedScenarioFile: 'Select Scenario File',
            chargeRate: '',
            fuelCapacity: '',
            gallonsPerThrust: '',
            gallonsPerSteer: '',
            gallonsPerScan: '',
            gallonsPerPass: '',
        };
    }

    handleTextChange = (event: any) => {
        const target = event.target;
        const name = target.name;
        var value;

        if (name === "chargeRate") { value = target.value };
        if (name === "fuelCapacity") { value = target.value };
        if (name === "gallonsPerThrust") { value = target.value };
        if (name === "gallonsPerSteer") { value = target.value };
        if (name === "gallonsPerScan") { value = target.value };
        if (name === "gallonsPerPass") { value = target.value };

        this.setState({
            [name]: value
        });
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

    handleStartSimulation() {
        history.push('/Simulation');
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
                    FUEL

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control name="chargeRate" type="text" onChange={this.handleTextChange} />
                        </div>
                        <this.displayText text="charge rate (gallons per turn)" />
                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control name="fuelCapacity" type="text" onChange={this.handleTextChange} />
                        </div>
                        <this.displayText text="fuel (gallons)" />
                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control name="gallonsPerThrust" type="text" onChange={this.handleTextChange} />
                        </div>
                        <this.displayText text="gallons per THRUST (each step)" />
                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control name="gallonsPerSteer" type="text" onChange={this.handleTextChange} />
                        </div>
                        <this.displayText text="gallons per STEER (any direction)" />
                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control name="gallonsPerScan" type="text" onChange={this.handleTextChange} />
                        </div>
                        <this.displayText text="gallons per SCAN" />
                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control name="gallonsPerPass" type="text" onChange={this.handleTextChange} />
                        </div>
                        <this.displayText text="gallons per PASS" />
                    </div>

                </div>

                <div className="block">
                    <div className="row">
                        <div className="colLeft">
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
                        <div className="colRight" />
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

export default Setup;
