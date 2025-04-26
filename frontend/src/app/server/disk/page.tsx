'use client';

import { Table } from '@/components/ui/table/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DiskBar } from '@/components/ui/chart/diskBar';

const diskMock = {
    container: [
        { containerName: 'nextuse-api', used: '12.4 GB', mountPath: '/data/api' },
        { containerName: 'ray-server', used: '3.2 GB', mountPath: '/data/ray' },
        { containerName: 'mysql-db', used: '27.6 GB', mountPath: '/var/lib/mysql' },
    ],
    mount: [
        { mount: '/', total: '512 GB', used: '340 GB', percent: 66, type: 'SSD' },
        { mount: '/mnt/data', total: '2 TB', used: '1.3 TB', percent: 65, type: 'HDD' },
    ],
};
export default function DiskPage() {
    const { container, mount } = diskMock;

    return (
        <>
            <div className='flex flex-col gap-6 px-8 py-6'>
                {/* 컨테이너별 디스크 사용량 */}
                <Card>
                    <CardHeader>
                        <CardTitle>컨테이너별 디스크 사용량</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table
                            data={{
                                columns: [
                                    { key: 'containerName', label: '컨테이너' },
                                    { key: 'used', label: '사용량' },
                                    { key: 'mountPath', label: '마운트 경로' },
                                ],
                                rows: container,
                            }}
                        />
                    </CardContent>
                </Card>

                {/* 디스크별 막대 시각화 */}
                <Card>
                    <CardHeader>
                        <CardTitle>마운트별 디스크 사용률</CardTitle>
                    </CardHeader>
                    <CardContent className='grid gap-4'>
                        {mount.map((d, i) => (
                            <DiskBar key={i} data={d} />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
