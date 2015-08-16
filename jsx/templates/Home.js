'use strict';

import React from 'react';

class Island extends React.Component {
    constructor () {
        super();
    }
    render () {
        return (
            <div className="Home">
                <div className="Home-container">
                    {this.props.description}
                </div>
            </div>
        );
    }
}

Island.propTypes = {
    description: React.PropTypes.string,
};

export default Island;
