'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockNetworks = [
    {
        name: 'jin-network',
        driver: 'bridge',
        containers: ['nextuse-api', 'ray-server', 'upload-server'],
    },
    {
        name: 'isolated-db-net',
        driver: 'bridge',
        containers: ['db'],
    },
];

export default function ProxyNetworkPage() {
    return (
        <div className='p-6 space-y-6'>
            <Card>
                <CardHeader>
                    <CardTitle>도커 네트워크 목록</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    {mockNetworks.map((net) => (
                        <div key={net.name} className='border rounded px-4 py-3'>
                            <div className='flex justify-between items-center mb-2'>
                                <div className='text-sm font-medium'>
                                    {net.name} <span className='text-muted-foreground'>({net.driver})</span>
                                </div>
                                <div className='flex gap-2'>
                                    <Button size='sm' variant='outline'>
                                        컨테이너 연결
                                    </Button>
                                    <Button size='sm' variant='outline' className='text-red-500'>
                                        삭제
                                    </Button>
                                </div>
                            </div>
                            <div className='text-xs text-muted-foreground'>연결된 컨테이너: {net.containers.join(', ')}</div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>네트워크 생성</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    {/* Input, Select 등 네트워크 생성용 UI 후속 구현 예정 */}
                    <Button size='sm'>네트워크 생성</Button>
                </CardContent>
            </Card>
        </div>
    );
}
