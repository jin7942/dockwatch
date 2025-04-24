'use client';

import { useEffect, useRef } from 'react';

export const LogBox = ({ logs }: { logs: string[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className='h-60 bg-zinc-900 text-zinc-100 text-xs font-mono rounded p-3 overflow-y-auto flex flex-col justify-end'>
            {logs.map((line, i) => (
                <div key={i}>{line}</div>
            ))}
        </div>
    );
};
