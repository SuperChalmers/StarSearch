import * as React from 'react';
import Drone from '../Drone';
import Starfield from '../Starfield';
import Sun from '../Sun';

class SpaceEntity extends React.Component<any, any> {
    render() {
        let html;
        
        if(this.props.type === "DRONE") {
            html = (
                <Drone direction={this.props.direction} active={this.props.active}></Drone>
            );
        }
        else if(this.props.type === "STARS") {
            html = (
                <Starfield></Starfield>
            );
        }
        else if(this.props.type === "EMPTY") {
            html = (
                <div></div>
            );
        }
        else if(this.props.type === "SUN") {
            html = (
                <Sun></Sun>
            );
        }
        
        return html;
    }
}

export default SpaceEntity;