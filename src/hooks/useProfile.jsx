import React from 'react';
import { ProfileContext } from '../context/index';

const useProfile = () => {
    return (
        React.useContext( ProfileContext )
    );
};

export default useProfile;