'use client';

import { DiskBarData } from '@/_types/api';

export function DiskBar({ data }: { data: DiskBarData }) {
    const percent = parseInt(data.percent);

    return (
        <div className='space-y-1 w-full'>
            <div className='flex justify-between text-sm font-medium'>
                <span>{`${data.mount} (${data.type})`}</span>
                <span>{data.percent}</span>
            </div>

            <div className='w-full h-3 bg-muted rounded overflow-hidden'>
                <div
                    className='h-full bg-primary rounded'
                    style={{
                        width: `${percent}%`,
                        minWidth: '0.25rem', // 1px도 보이게
                        transition: 'width 0.3s ease',
                    }}
                />
            </div>

            <div className='text-xs text-muted-foreground'>
                {data.used} / {data.total}
            </div>
        </div>
    );
}
