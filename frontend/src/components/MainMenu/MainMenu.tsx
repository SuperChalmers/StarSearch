import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import './MainMenu.scss';

class MainMenu extends React.Component<any, any> {
    render() {
        return (
            <div className="center">
                <ButtonGroup vertical>
                    <Button variant="primary" size="lg">
                        START
                    </Button>
                    <br />
                    <Button variant="primary" size="lg">
                        RESUME
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default MainMenu;
