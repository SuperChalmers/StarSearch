import * as React from 'react';
import { Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import history from './../history';
import './Setup.scss';

class Setup extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            turnDelay: '',
            selectedScenarioFile: '',
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

        if (name === "turnDelay") { value = target.value };
        if (name === "selectedScenarioFile") { value = target.value };
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

    goToSimulation() {
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
                    GENERAL

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control name="turnDelay" type="text" onChange={this.handleTextChange} />
                        </div>
                        <this.displayText text="seconds delay between turns" />

                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <DropdownButton
                                id="scenarioFile"
                                title={this.state.selectedScenarioFile}
                                onSelect={(e: any) => { this.setState({ selectedScenarioFile: e }) }}
                            >
                                <Dropdown.Item eventKey="scenario0.csv">scenario0.csv</Dropdown.Item>
                                <Dropdown.Item eventKey="scenario1.csv">scenario1.csv</Dropdown.Item>
                                <Dropdown.Item eventKey="scenario2.csv">scenario2.csv</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <this.displayText text="scenario file" />
                    </div>
                </div>

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
                        <Button size="lg" onClick={this.goToSimulation}>
                            START
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Setup;
