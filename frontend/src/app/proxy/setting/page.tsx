'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProxyRoute {
    id: string;
    domain: string;
    path?: string;
    container: string;
    enabled: boolean;
}

const initialRoutes: ProxyRoute[] = [
    { id: '1', domain: 'ascii.jin7942.co.kr', path: '/', container: 'nextuse-frontend', enabled: true },
    { id: '2', domain: 'cicd.ray-auto-deploy', path: '/', container: 'ray-server', enabled: true },
];

const containers = ['nextuse-frontend', 'ray-server', 'upload-server'];

export default function ProxySettingPage() {
    const [routes, setRoutes] = useState<ProxyRoute[]>(initialRoutes);
    const [newRoute, setNewRoute] = useState<{ domain: string; path: string; container: string }>({
        domain: '',
        path: '/',
        container: containers[0],
    });

    const addRoute = () => {
        const newEntry: ProxyRoute = {
            id: Date.now().toString(),
            domain: newRoute.domain,
            path: newRoute.path,
            container: newRoute.container,
            enabled: true,
        };
        setRoutes((prev) => [...prev, newEntry]);
        setNewRoute({ domain: '', path: '/', container: containers[0] });
    };

    return (
        <div className='p-6 space-y-6'>
            <Card>
                <CardHeader>
                    <CardTitle>프록시 라우팅 목록</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                    {routes.map((route) => (
                        <div key={route.id} className='flex justify-between items-center border rounded px-4 py-2'>
                            <div className='text-sm'>
                                <div>
                                    <strong>{route.domain}</strong> {route.path}
                                </div>
                                <div className='text-muted-foreground'>→ {route.container}</div>
                            </div>
                            <div className='flex gap-2'>
                                <Button size='sm' variant='outline'>
                                    수정
                                </Button>
                                <Button size='sm' variant='outline' className='text-red-500'>
                                    삭제
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>새 라우팅 추가</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <Input placeholder='도메인 입력' value={newRoute.domain} onChange={(e) => setNewRoute({ ...newRoute, domain: e.target.value })} />
                    <Input placeholder='경로 (예: /api)' value={newRoute.path} onChange={(e) => setNewRoute({ ...newRoute, path: e.target.value })} />
                    <Select value={newRoute.container} onValueChange={(value: string) => setNewRoute({ ...newRoute, container: value })}>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='컨테이너 선택' />
                        </SelectTrigger>
                        <SelectContent>
                            {containers.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {c}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={addRoute}>매핑 추가</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>설정 적용</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex gap-3'>
                        <Button variant='outline'>적용 미리보기</Button>
                        <Button variant='default'>설정 적용 (nginx reload)</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
