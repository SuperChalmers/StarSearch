import * as React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import "./index.scss";

class DroneComponent extends React.Component<any, any> {
    getIconHtml = function(rocketDirection: string, active: boolean = false) {
        let html;
        let droneClass;
        if(active) {
            droneClass = rocketDirection + " bi bi-cursor-fill";
            html = (
                <svg className={droneClass} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M14.082 2.182a.5.5 0 01.103.557L8.528 15.467a.5.5 0 01-.917-.007L5.57 10.694.803 8.652a.5.5 0 01-.006-.916l12.728-5.657a.5.5 0 01.556.103z" clipRule="evenodd"/>
                </svg>
            );
        }
        else {
            droneClass = rocketDirection + " bi bi-cursor";
            html = (
                <svg className={droneClass} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M14.082 2.182a.5.5 0 01.103.557L8.528 15.467a.5.5 0 01-.917-.007L5.57 10.694.803 8.652a.5.5 0 01-.006-.916l12.728-5.657a.5.5 0 01.556.103zM2.25 8.184l3.897 1.67a.5.5 0 01.262.263l1.67 3.897L12.743 3.52 2.25 8.184z" clipRule="evenodd"/>
                </svg>
            )
        }
        return html;
    }
    
    render() {
        const rocketIcon = this.getIconHtml(this.props.direction, this.props.active);
        const tooltip = (
            <Tooltip id="overlay-example">
                Fuel: {this.props.fuel}
            </Tooltip>
        )

        return (
            <div>
                <OverlayTrigger placement="left" overlay={tooltip}>
                    {rocketIcon}
                </OverlayTrigger>       
            </div>
        );
    }
}

export default DroneComponent;