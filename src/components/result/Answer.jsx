// import React from 'react';

export default function Answer() {
    return (
        <div className="rounded-lg overflow-hidden shadow-sm mb-4">
            <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">3. What is the height of an empty binary tree?</h3>
                </div>
                <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                        <input type="radio" name="answer3" className="form-radio text-buzzr-purple" checked />
                        <span>0</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input type="radio" name="answer3" className="form-radio text-buzzr-purple" />
                        <span>-1</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input type="radio" name="answer3" className="form-radio text-buzzr-purple" />
                        <span>1</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input type="radio" name="answer3" className="form-radio text-buzzr-purple" />
                        <span>Undefined</span>
                    </label>
                </div>
            </div>
            <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                <button className="text-primary hover:text-primary/80 font-medium">Edit Question</button>
            </div>
        </div>
    );
}
