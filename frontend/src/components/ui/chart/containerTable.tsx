'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Circle } from 'lucide-react';

interface ContainerInfo {
    name: string;
    image: string;
    status: string;
    cpu: string;
    memory: string;
}

export function ContainerTable({ containers }: { containers: ContainerInfo[] }) {
    return (
        <div className='rounded-md border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>이름</TableHead>
                        <TableHead>이미지</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>CPU</TableHead>
                        <TableHead>Memory</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {containers.map((container, idx) => (
                        <TableRow key={idx}>
                            <TableCell className='font-medium'>{container.name}</TableCell>
                            <TableCell>{container.image}</TableCell>
                            <TableCell className='flex items-center gap-2'>
                                <Circle className='h-3 w-3' fill={getStatusColor(container.status)} color={getStatusColor(container.status)} />
                                {container.status}
                            </TableCell>
                            <TableCell>{container.cpu}</TableCell>
                            <TableCell>{container.memory}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
        case 'running':
            return '#22c55e'; // green-500
        case 'exited':
            return '#ef4444'; // red-500
        case 'paused':
            return '#f97316'; // orange-500
        default:
            return '#9ca3af'; // gray-400
    }
}
