import React from 'react';
import { Redirect } from 'react-router-dom';

const LandingPage = () => {
    return (
        <Redirect to="/products" />
     );
}

export default LandingPage;