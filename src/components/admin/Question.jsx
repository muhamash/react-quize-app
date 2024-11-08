/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import { useForm } from 'react-hook-form';

export default function Question() {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            answer2: ''
        }
    });

    const onSubmit = (data) => {
        console.log("Selected Answer:", data.answer2);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg overflow-hidden shadow-sm mb-4">
            <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        2. What is the maximum number of nodes at level 'L' in a binary tree?
                    </h3>
                </div>
                <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                        <input
                            type="radio"
                            value="2^L"
                            {...register("answer2", { required: true })}
                            className="form-radio text-buzzr-purple"
                        />
                        <span>2^L</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            type="radio"
                            value="L"
                            {...register("answer2")}
                            className="form-radio text-buzzr-purple"
                        />
                        <span>L</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            type="radio"
                            value="2^(L-1)"
                            {...register("answer2")}
                            className="form-radio text-buzzr-purple"
                        />
                        <span>2^(L-1)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                        <input
                            type="radio"
                            value="2L"
                            {...register("answer2")}
                            className="form-radio text-buzzr-purple"
                        />
                        <span>2L</span>
                    </label>
                </div>
            </div>
            <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <button type="button" className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                <button type="button" className="text-primary hover:text-primary/80 font-medium">Edit Question</button>
            </div>
        </form>
    );
}