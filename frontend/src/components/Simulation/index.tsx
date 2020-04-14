import * as React from 'react';
import { Table, Button } from 'react-bootstrap';
import history from './../history';

import './index.scss';
import SpaceEntityComponent from '../SpaceEntity';
import * as SimulationRequest from '../../requests';
import { convertSimulationResponse } from '../../helpers';
import { Simulation as SimulationModel } from '../../models';

export default class SimulationComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        var simulationArray = convertSimulationResponse(this.props.location.state.simulation);
        var simulationModel = new SimulationModel("1", simulationArray);

        this.state = {
            safeSquares: simulationModel.getSafeSquares(),
            exploredSquares: simulationModel.getExploredSquares(),
            turnsTaken: this.props.location.state.simulation.turnsTaken,
            simulation: simulationModel
        };
    }

    handleNextTurn = async () => {
        // Get next state from the server.
        var simulation = await SimulationRequest.nextStep();
        var simulationArray = convertSimulationResponse(simulation);
        var simulationModel = new SimulationModel("1", simulationArray);

        this.setState({
            turnsTaken: simulation.turnsTaken,
            simulation: simulationModel
        });
    }

    handleFastForward = async () => {
        var simulation = await SimulationRequest.fastForward();
        var simulationArray = convertSimulationResponse(simulation);
        var simulationModel = new SimulationModel("1", simulationArray);

        this.setState({
            turnsTaken: simulation.turnsTaken,
            simulation: simulationModel
        });
    }

    handleStopSimulation = async () => {
        await SimulationRequest.stop(this.state.id);

        history.replace('/');
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
                            <SpaceEntityComponent
                                direction={spaceEntity.direction}
                                type={spaceEntity.type}
                                active={spaceEntity.active}
                                status={spaceEntity.status}
                                explored={spaceEntity.explored}
                                known={spaceEntity.known}
                                fuel={spaceEntity.fuel}>
                            </SpaceEntityComponent>
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
                        <Button size="lg" className="button" onClick={() => this.handleNextTurn()} >
                            NEXT TURN
                        </Button>

                        <Button size="lg" className="button" onClick={this.handleFastForward} >
                            FAST FORWARD
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
                            {this.displayText(this.state.safeSquares)}
                            {this.displayText(this.state.exploredSquares)}
                            {this.displayText(this.state.turnsTaken)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
