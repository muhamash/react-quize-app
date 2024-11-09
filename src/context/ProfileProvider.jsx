/* eslint-disable react/prop-types */
import React from 'react';
import { ProfileContext } from '../context';
import { ProfileReducer, initialState } from '../reducers/ProfileReducer';

export default function ProfileProvider({children}) {
    const [ state, dispatch ] = React.useReducer( ProfileReducer, initialState );

    return (
        <ProfileContext.Provider value={ { state, dispatch } }>
            { children }
        </ProfileContext.Provider>
    );
}