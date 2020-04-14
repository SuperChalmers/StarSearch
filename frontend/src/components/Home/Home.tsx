import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import history from './../history';
import './Home.scss';
import { loadSimulation } from '../../requests/Simulation';

class Home extends React.Component<any, any> {
    goToSetup() {
        history.push('/Setup');
    }

    async resumeSimulation () {
        var simulation = await loadSimulation();
        history.push('/Simulation', { simulation: simulation });
    }

    render() {
        return (
            <div className="center">
                <ButtonGroup vertical>
                    <Button variant="primary" size="lg" onClick={this.goToSetup}>
                        START
                    </Button>
                    <br />
                    <Button variant="primary" size="lg" onClick={this.resumeSimulation}>
                        RESUME
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default Home;
