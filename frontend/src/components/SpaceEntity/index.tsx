import * as React from 'react';
import DroneComponent from '../Drone';
import StarfieldComponent from '../Starfield';
import SunComponent from '../Sun';

export default class SpaceEntityComponent extends React.Component<any, any> {
    render() {
        let html;
        
        // If the object isn't known, don't show it at all.
        if(!this.props.known) {
            html = (
                <div/>
            );
        }
        else if(this.props.type === "DRONE") {
            html = (
                <DroneComponent direction={this.props.direction} active={this.props.active} fuel={this.props.fuel}/>
            );
        }
        else if(this.props.type === "STARS") {
            html = (
                <StarfieldComponent explored={this.props.explored}/>
            );
        }
        else if(this.props.type === "EMPTY") {
            html = (
                <div/>
            );
        }
        else if(this.props.type === "SUN") {
            html = (
                <SunComponent/>
            );
        }
        
        return html;
    }
}