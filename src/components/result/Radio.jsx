/* eslint-disable react/prop-types */
export default function Radio({ label, name, value, checked, selected, onChange }) {
    return (
        <div>
            <label className="flex items-center space-x-3">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange} // Use onChange for controlled input
                    className={`form-radio ${checked ? 'text-violet-600 ring-2 ring-violet-500' : 'text-gray-400'}`}
                />
                <span>{label}</span>
                {selected && <span className="text-green-500 ml-2 text-sm">user selected</span>}
            </label>
        </div>
    );
}