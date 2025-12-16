import { useState, useEffect, useRef, MutableRefObject } from 'react';

export default function useOnScreen<T extends Element>(
    options?: IntersectionObserverInit,
    once: boolean = true
): [MutableRefObject<T | null>, boolean] {
    const ref = useRef<T | null>(null);
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Update our state when observer callback fires
            setIntersecting(entry.isIntersecting);

            // If we only want to trigger once and we are intersecting, disconnect
            if (once && entry.isIntersecting) {
                observer.disconnect();
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [ref, options, once]);

    return [ref, isIntersecting];
}
