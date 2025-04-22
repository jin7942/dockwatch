'use client';

import { useEffect, useState } from 'react';
import { ResourceChart } from '@/components/ui/chart/resourceChart';
import { Table } from '@/components/ui/table/table';
import type { ResourceFullData, ResourceInfo, TableData } from '@/_types/resource';

const defaultTable: TableData = {
    columns: [
        { key: 'pid', label: 'PID' },
        { key: 'name', label: '프로세스' },
        { key: 'usage', label: '사용률' },
    ],
    rows: [],
};

const defaultInfo: ResourceInfo[] = [];

export default function UsagePage() {
    const [resources, setResources] = useState<Record<'cpu' | 'memory' | 'disk', ResourceFullData>>({
        cpu: { chart: [], info: defaultInfo, table: defaultTable },
        memory: { chart: [], info: defaultInfo, table: defaultTable },
        disk: { chart: [], info: defaultInfo, table: defaultTable },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const random = () => parseFloat((Math.random() * 100).toFixed(1));

            ['cpu', 'memory', 'disk'].forEach((key) => {
                setResources((prev) => {
                    const chart = [
                        ...prev[key as keyof typeof prev].chart.slice(-59),
                        {
                            index: prev[key as keyof typeof prev].chart.length + 1,
                            value: random(),
                        },
                    ];

                    const info: ResourceInfo[] =
                        key === 'cpu'
                            ? [
                                  { label: '속도', value: '3.08GHz' },
                                  { label: '코어', value: '8' },
                                  { label: '스레드', value: '16' },
                              ]
                            : key === 'memory'
                            ? [
                                  { label: '총 메모리', value: '16 GB' },
                                  { label: '사용 중', value: '9.2 GB' },
                                  { label: '캐시', value: '1.3 GB' },
                              ]
                            : [
                                  { label: '총 용량', value: '512 GB' },
                                  { label: '사용 중', value: '273 GB' },
                                  { label: 'I/O', value: '120 MB/s' },
                              ];

                    return {
                        ...prev,
                        [key]: {
                            ...prev[key as keyof typeof prev],
                            chart,
                            info,
                            table: {
                                ...defaultTable,
                                rows: [
                                    { pid: '1234', name: 'nginx', usage: '15.2%' },
                                    { pid: '5678', name: 'node', usage: '8.4%' },
                                    { pid: '4321', name: 'chrome', usage: '22.1%' },
                                ],
                            },
                        },
                    };
                });
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col gap-6 px-8 py-6 min-h-screen'>
            {(['cpu', 'memory', 'disk'] as const).map((key) => (
                <div key={key} className='flex gap-4 flex-1 min-h-[300px]'>
                    <div className='w-3/5 min-w-0 h-full'>
                        <ResourceChart data={resources[key]} />
                    </div>
                    <div className='w-2/5 min-w-0 h-full'>
                        <Table data={resources[key].table} />
                    </div>
                </div>
            ))}
        </div>
    );
}
