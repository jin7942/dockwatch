'use client';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { RadialChart } from '@/components/ui/chart/radialChart';
import { NetworkBarChart } from '@/components/ui/chart/networkBarChart';
import { ContainerTable } from '@/components/ui/chart/containerTable';
import DynamicBreadcrumbWrapper from '@/components/ui/custom/DynamicBreadcrumbWrapper';
// fuck
export default function Page() {
    const containerDataTmp = [
        {
            name: '컨테이너 이름',
            image: '사용중인 이미지',
            status: 'running',
            cpu: '45%',
            memory: '3MB',
        },
        {
            name: '컨테이너 이름',
            image: '사용중인 이미지',
            status: 'running',
            cpu: '45%',
            memory: '3MB',
        },
        {
            name: '컨테이너 이름',
            image: '사용중인 이미지',
            status: 'running',
            cpu: '45%',
            memory: '3MB',
        },
        {
            name: '컨테이너 이름',
            image: '사용중인 이미지',
            status: 'running',
            cpu: '45%',
            memory: '3MB',
        },
    ];

    const cpuData = {
        label: 'CPU 사용량',
        value: 40,
    };

    const ramData = {
        label: '메모리 사용량',
        value: 50,
    };

    const diskData = {
        label: '디스크 사용량',
        value: 30,
    };

    const onContainerData = {
        label: '실행 중인 컨테이너 수',
        value: 4,
        unit: '개',
    };
    const networkData = {
        label: '네트워크 사용량',
        value: 3000,
        unit: 'Mbps',
    };
    const upTimeData = {
        label: '서버 가동 시간',
        value: 11,
        unit: '시간',
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
                        <DynamicBreadcrumbWrapper />
                    </div>
                </header>
                <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                    <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
                        {/* CPU 리소스 */}
                        <div className='bg-muted/50 aspect-video rounded-xl'>
                            <RadialChart data={cpuData} />
                        </div>

                        {/* 메모리 리소스 */}
                        <div className='bg-muted/50 aspect-video rounded-xl'>
                            <RadialChart data={ramData} />
                        </div>

                        {/* 디스크 리소스 */}
                        <div className='bg-muted/50 aspect-video rounded-xl'>
                            <RadialChart data={diskData} />
                        </div>
                    </div>
                    <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
                        {/* 실행중인 컨테이너 수 */}
                        <div className='bg-muted/50 aspect-video rounded-xl'>
                            <RadialChart data={onContainerData} />
                        </div>

                        {/* 네트워크 사용량 */}
                        <div className='bg-muted/50 aspect-video rounded-xl'>
                            <RadialChart data={networkData} />
                        </div>

                        {/* 시스템 가동 시간 */}
                        <div className='bg-muted/50 aspect-video rounded-xl'>
                            <RadialChart data={upTimeData} />
                        </div>
                    </div>

                    {/* 실행중인 컨테이너 목록 */}
                    <div className='bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
                        <ContainerTable containers={containerDataTmp} />
                    </div>

                    {/* 네트워크 사용량 그래프 */}
                    <div className='bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
                        <NetworkBarChart />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
