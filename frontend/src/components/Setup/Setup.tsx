import * as React from 'react';
import { Button, ButtonGroup, Form, Dropdown } from 'react-bootstrap';
import history from './../history';
import './Setup.scss';

class Setup extends React.Component<any, any> {
    goToSimulation() {
        history.push('/Simulation');
    }

    render() {
        return (
            <div>
                <div className="block">
                    GENERAL

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control size="lg" type="text" />
                        </div>
                        <div className="colRight">
                            seconds delay between turns
                        </div>
                    </div>

                    <div className="row">
                        <div className="colLeft">

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">scenario0.csv</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">scenario1.csv</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">scenario2.csv</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>


                        </div>
                        <div className="colRight">
                            scenario file
                        </div>
                    </div>

                </div>

                <div className="block">
                    FUEL

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control size="lg" type="text" />
                        </div>
                        <div className="colRight">
                            charge rate (gallons per turn)
                        </div>
                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control size="lg" type="text" />
                        </div>
                        <div className="colRight">
                            fuel (gallons)
                        </div>
                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control size="lg" type="text" />
                        </div>
                        <div className="colRight">
                            gallons per THRUST (each step)
                        </div>
                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control size="lg" type="text" />
                        </div>
                        <div className="colRight">
                            gallons per STEER (any direction)
                        </div>
                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control size="lg" type="text" />
                        </div>
                        <div className="colRight">
                            gallons per SCAN
                        </div>
                    </div>

                    <div className="row">
                        <div className="colLeft">
                            <Form.Control size="lg" type="text" />
                        </div>
                        <div className="colRight">
                            gallons per PASS
                        </div>
                    </div>

                </div>

                <div className="block">
                    <div className="row">
                        <Button variant="primary" size="lg" onClick={this.goToSimulation}>
                            START
                        </Button>
                    </div>

                </div>
            </div>
        );
    }
}

export default Setup;
