import { type ClassValue, clsx } from 'clsx';
import { exportTraceState } from 'next/dist/trace';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
    let timerId: ReturnType<typeof setTimeout>;

    const debouncedFunction = (...args: Parameters<T>): void => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func(...args);
        }, delay);
    };

    debouncedFunction.cancel = () => {
        clearTimeout(timerId);
    };

    return debouncedFunction;
};
