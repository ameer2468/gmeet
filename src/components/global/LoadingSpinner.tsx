import React from 'react';
import Loader from "react-loader-spinner";

const LoadingSpinner = () => {
    return (
        <Loader
            type="Oval"
            color="#FFFFFF"
            height={35}
            width={35}
        />
    );
};

export default LoadingSpinner;