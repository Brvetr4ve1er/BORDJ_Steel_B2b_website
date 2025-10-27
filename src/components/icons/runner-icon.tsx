
import { cn } from '@/lib/utils';
import * as React from 'react';

export function RunnerIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('w-6 h-6', className)}
        >
            <circle cx="12" cy="4" r="2" />
            <path d="M15.5 8.5L12 12l-2-2" />
            <path d="M12 12l-2 4h4l2-4" />
            <path d="M10 20l-2-4" />
            <path d="M14 20l2-4" />
        </svg>
    );
}
