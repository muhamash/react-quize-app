/* eslint-disable react/prop-types */
// import React from 'react';

export default function Radio ( { label, name, value, checked} )
{
    return (
        <div>
            <label className="flex items-center space-x-3">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    className="form-radio text-buzzr-purple"
                />
                <span>{label}</span>
            </label>
        </div>
    );
}