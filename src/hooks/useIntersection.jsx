/* eslint-disable no-unused-vars */
import { useCallback, useRef } from 'react';

export default function useIntersectionObserver(callback) {
    const targetRef = useRef(null);

    const observer = useCallback(
        (node) => {
            const observerInstance = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback(); 
                }
            }, { threshold: 0.1 });

            if (node) {
                observerInstance.observe(node);
            }

            return () => {
                if (node) observerInstance.unobserve(node);
            };
        },
        [callback]
    );

    return targetRef;
}