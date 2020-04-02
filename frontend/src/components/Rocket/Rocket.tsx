import * as React from 'react';

class Rocket extends React.Component<any, any> {
    render() {
        return (
            <img src={require("./rocket.png")} className={this.props.direction}></img>
        );
    }
}

export default Rocket;