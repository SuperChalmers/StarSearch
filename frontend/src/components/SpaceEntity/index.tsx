import * as React from 'react';
import DroneComponent from '../Drone';
import Starfield from '../Starfield';
import Sun from '../Sun';

class SpaceEntity extends React.Component<any, any> {
    render() {
        let html;
        
        // If the object isn't known, don't show it at all.
        if(!this.props.known) {
            html = (
                <div></div>
            );
        }
        else if(this.props.type === "DRONE") {
            html = (
                <DroneComponent direction={this.props.direction} active={this.props.active} fuel={this.props.fuel}></DroneComponent>
            );
        }
        else if(this.props.type === "STARS") {
            html = (
                <Starfield explored={this.props.explored}></Starfield>
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