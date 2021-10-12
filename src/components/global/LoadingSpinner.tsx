import React from 'react';
import Loader from "react-loader-spinner";

interface props {
    height: number;
    width: number;
}

const LoadingSpinner = (props: props) => {
    return (
        <Loader
            type="Oval"
            color="#FFFFFF"
            height={props.height}
            width={props.width}
        />
    );
};

export default LoadingSpinner;