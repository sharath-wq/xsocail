import { type ClassValue, clsx } from 'clsx';
import { exportTraceState } from 'next/dist/trace';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
