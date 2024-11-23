import Indicator from "./Indicator";

/* eslint-disable react/prop-types */
export function SelectionTracker({ label, name, value, checked, isUserSelection, isCorrectAnswer }) {
    return (
        <div className={ `` }>
            {/* {
                isCorrectAnswer && (
                    <p>correct</p>
                )
            } */}
            <label className="flex items-center space-x-3">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    disabled
                    checked={checked}
                    className={`form-radio 
                        ${isCorrectAnswer ? 'text-green-800 ring-2 ring-green-800' : ''} 
                        ${isUserSelection && !isCorrectAnswer ? 'text-violet-700 ring-2 ring-violet-700' : ''} 
                        ${!isUserSelection && !isCorrectAnswer ? 'text-gray-100' : ''}
                    `}
                />
                <span className={isCorrectAnswer ? 'text-green-900' : isUserSelection ? 'text-violet-900' : 'text-white'}>
                    {label}
                </span>
                {
                    isUserSelection && !isCorrectAnswer && (
                        <Indicator text={'*** You have selected option but wrong answer ***'}/>
                    )
                }

                {
                    !isUserSelection && isCorrectAnswer && (
                        <Indicator text={'*** correct option ***'}/>
                    )
                }
                {
                    isUserSelection && isCorrectAnswer && (
                        <Indicator text={'*** You have selected the correct option ***'}/>
                    )
                }
            </label>
        </div>
    );
}