import React from 'react';
import { App, Debugger } from '@flexn/create';
import Navigation from './navigation';

const Root = () => {
    return (
        <App style={{ flex: 1 }}>
            <Navigation />
            <Debugger />
        </App>
    );
};

export default Root;
