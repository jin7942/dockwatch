'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResourceChart } from '@/components/ui/chart/resourceChart';
import { LogBox } from '@/components/ui/custom/LogBox';

import type { ResourceFullData, NetworkResourceData } from '@/_types/api';

const mockContainer = {
    name: 'ray-server',
    image: 'ray:1.4.1',
    status: 'running',
    ports: ['7979:7979'],
    network: 'jin-network',
    volumes: ['/app/logs:/logs'],
};

const generateChartData = () => Array.from({ length: 60 }, (_, i) => ({ index: i + 1, value: Math.random() * 100 }));
const generateNetworkData = () => Array.from({ length: 60 }, (_, i) => ({ index: i + 1, tx: Math.random() * 1000, rx: Math.random() * 1000 }));

const baseTable = {
    columns: [
        { key: 'pid', label: 'PID' },
        { key: 'name', label: '프로세스' },
        { key: 'usage', label: '사용률' },
    ],
    rows: [
        { pid: '1234', name: 'nginx', usage: '12.3%' },
        { pid: '5678', name: 'node', usage: '8.4%' },
    ],
};

const mockFullResource: ResourceFullData = {
    chart: generateChartData(),
    info: [
        { label: '1분 평균', value: '24.2%' },
        { label: '1시간 평균', value: '32.8%' },
    ],
    table: baseTable,
};

const mockNetResource: NetworkResourceData = {
    chart: generateNetworkData(),
    info: [
        { label: 'Tx 총량', value: '12.8 MB' },
        { label: 'Rx 총량', value: '9.4 MB' },
    ],
    table: baseTable,
};

export default function ContainerDetailPage() {
    const { name } = useParams();
    const container = mockContainer;

    return (
        <div className='p-6 space-y-6'>
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-3'>
                        {container.name}
                        <Badge variant={container.status === 'running' ? 'default' : 'destructive'} className='uppercase text-[10px]'>
                            {container.status}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className='text-sm space-y-2 text-muted-foreground'>
                    <div className='flex justify-between'>
                        <span className='font-medium'>이미지</span>
                        <span>{container.image}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='font-medium'>포트</span>
                        <span>{container.ports.join(', ')}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='font-medium'>네트워크</span>
                        <span>{container.network}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='font-medium'>볼륨</span>
                        <span>{container.volumes.join(', ')}</span>
                    </div>

                    <div className='mt-4 flex flex-col gap-3'>
                        <div className='flex gap-2'>
                            <Button size='sm' variant='outline'>
                                시작
                            </Button>
                            <Button size='sm' variant='outline'>
                                중지
                            </Button>
                            <Button size='sm' variant='outline'>
                                재시작
                            </Button>
                        </div>
                        <div className='mt-4'>
                            <LogBox logs={['[INFO] Container started...', '[INFO] Listening on port 7979...', '[ERROR] Health check failed']} />

                            <div className='pt-2'>
                                <Button variant='link' className='text-xs px-0 h-auto'>
                                    전체 로그 보기
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 리소스 사용량 섹션 */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full h-full'>
                    <ResourceChart data={mockFullResource} />
                </div>
                <div className='w-full h-full'>
                    <ResourceChart data={mockFullResource} />
                </div>
                <div className='w-full h-full'>
                    <ResourceChart data={mockFullResource} />
                </div>
                <div className='w-full h-full'>
                    <ResourceChart data={mockNetResource} />
                </div>
            </div>
        </div>
    );
}
