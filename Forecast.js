import React from 'react'

class Forecast extends React.Component {
    render() {
        const { date, description } = this.props;
        return (
            <div>
                <h1>{date}</h1>
                <h2>{description}</h2>
            </div>
        );
    }
}
