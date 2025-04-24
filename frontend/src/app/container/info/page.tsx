'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const containerList = [
    {
        name: 'nextuse-api',
        status: 'running',
        image: 'nextuse:latest',
        ports: ['3000:3000'],
    },
    {
        name: 'ray-server',
        status: 'exited',
        image: 'ray:1.4.1',
        ports: ['7979:7979'],
    },
];

export default function ContainerPage() {
    return (
        <div className='flex flex-col gap-6 px-8 py-6'>
            <Card>
                <CardHeader>
                    <CardTitle>컨테이너 목록</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className='max-h-[70vh]'>
                        <div className='grid gap-4'>
                            {containerList.map((container) => (
                                <div key={container.name} className='flex flex-col sm:flex-row sm:items-center justify-between border rounded p-4 gap-2'>
                                    <div className='space-y-1'>
                                        <div className='font-medium text-base'>{container.name}</div>
                                        <div className='text-xs text-muted-foreground'>{container.image}</div>
                                        <div className='text-xs text-muted-foreground'>Port: {container.ports.join(', ')}</div>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <Badge variant={container.status === 'running' ? 'default' : 'destructive'} className='uppercase text-[10px]'>
                                            {container.status}
                                        </Badge>
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
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
