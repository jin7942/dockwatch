// src/pages/dashboard.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
    return (
        <div className='p-6 space-y-6'>
            {/* 카드 영역 */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>CPU 사용량</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={72} className='mb-2' />
                        <p className='text-sm text-muted-foreground'>현재 72% 사용 중</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>메모리</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={53} className='mb-2' />
                        <p className='text-sm text-muted-foreground'>5.3 GB / 10 GB</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>디스크</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={40} className='mb-2' />
                        <p className='text-sm text-muted-foreground'>사용량 40%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>네트워크</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-sm'>UP: 2.4MB/s / DOWN: 5.2MB/s</p>
                    </CardContent>
                </Card>
            </div>

            {/* 테이블 자리 (추후 컨테이너 리스트) */}
            <div className='mt-6'>
                <h2 className='text-xl font-semibold mb-2'>실행 중인 컨테이너</h2>
                <div className='rounded-md border p-4 text-sm text-muted-foreground'>테이블 영역 (추후 구현)</div>
            </div>
        </div>
    );
}
