
import { cn } from '@/lib/utils';
import * as React from 'react';

export function FlagIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn('w-6 h-6', className)}
        >
            <path d="M4 21v-2h2V3h12l-4 4 4 4H6v10H4z" />
        </svg>
    );
}
