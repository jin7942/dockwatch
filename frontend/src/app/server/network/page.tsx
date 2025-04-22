'use client';

import { useEffect, useState } from 'react';
import { ResourceChart } from '@/components/ui/chart/resourceChart';
import { Table } from '@/components/ui/table/table';
import type { NetworkResourceData } from '@/_types/resource';

export default function NetworkPage() {
    const [data, setData] = useState<NetworkResourceData>({
        chart: [],
        info: [],
        table: {
            columns: [
                { key: 'pid', label: 'PID' },
                { key: 'name', label: '프로세스' },
                { key: 'rx', label: '수신량' },
                { key: 'tx', label: '전송량' },
                { key: 'state', label: '상태' },
            ],
            rows: [],
        },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const random = () => parseFloat((Math.random() * 1000).toFixed(1));

            setData((prev) => {
                const updated = [
                    ...prev.chart.slice(-59),
                    {
                        index: prev.chart.length > 0 ? prev.chart[prev.chart.length - 1].index + 1 : 1,
                        tx: random(),
                        rx: random(),
                    },
                ];

                return {
                    ...prev,
                    chart: updated,
                    info: [
                        { label: '인터페이스', value: 'eth0' },
                        { label: 'IP 주소', value: '192.168.0.15' },
                        { label: 'MAC 주소', value: '02:42:ac:11:00:02' },
                        { label: '총 수신량', value: '3.8 GB' },
                        { label: '총 전송량', value: '1.4 GB' },
                    ],
                    table: {
                        ...prev.table,
                        rows: [
                            { pid: '1234', name: 'nginx', rx: '120 KB/s', tx: '85 KB/s', state: 'ESTABLISHED' },
                            { pid: '5678', name: 'node', rx: '90 KB/s', tx: '50 KB/s', state: 'LISTENING' },
                            { pid: '7788', name: 'docker-proxy', rx: '10 KB/s', tx: '25 KB/s', state: 'CLOSE_WAIT' },
                        ],
                    },
                };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col gap-6 px-8 py-6 min-h-screen'>
            <div className='flex-1 min-h-[300px]'>
                <ResourceChart data={data} />
            </div>
            <div className='flex-1 min-h-[300px]'>
                <Table data={data.table} />
            </div>
        </div>
    );
}
