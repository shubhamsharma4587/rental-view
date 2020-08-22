import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
    return (
        <h2 style={{color: "#fff"}}>
            {props.children}
        </h2>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};