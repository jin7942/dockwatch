'use client';

import { RadialChart } from '@/components/ui/chart/radialChart';
import { NetworkBarChart } from '@/components/ui/chart/networkBarChart';
import { ContainerTable } from '@/components/ui/chart/containerTable';

// type
import type { RadialChartData } from '@/components/ui/chart/radialChart';
import type { NetworkData } from '@/components/ui/chart/networkBarChart';
import type { ContainerInfo } from '@/components/ui/chart/containerTable';

import type { SysUsageVo } from '@/_types/api';

import { api } from '@/lib/axios';
import { useState, useEffect } from 'react';
import UsagePage from '../server/usage/page';

export interface DashBoardData {
    containerList: ContainerInfo[];
    radial: {
        cpu: RadialChartData;
        memory: RadialChartData;
        disk: RadialChartData;
        containerCount: RadialChartData;
        network: RadialChartData;
        uptimeHours: RadialChartData;
    };
    networkChart: NetworkData[];
}

export default function Page() {
    const dataTmp: DashBoardData = {
        containerList: [
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
        ],
        radial: {
            cpu: {
                label: 'CPU 사용량',
                value: 40,
            },
            memory: {
                label: '메모리 사용량',
                value: 50,
            },
            disk: {
                label: '디스크 사용량',
                value: 30,
            },
            containerCount: {
                label: '실행 중인 컨테이너 수',
                value: 4,
                unit: '개',
            },
            network: {
                label: '네트워크 사용량',
                value: 3000,
                unit: 'bps',
            },
            uptimeHours: {
                label: '서버 가동 시간',
                value: 11,
                unit: '시간',
            },
        },
        networkChart: [
            { date: '2024-04-01', desktop: 222, mobile: 150 },
            { date: '2024-04-02', desktop: 97, mobile: 180 },
        ],
    };

    const [data, setData] = useState<DashBoardData>({
        containerList: [],
        radial: {
            cpu: { label: 'CPU 사용량', value: 0 },
            memory: { label: '메모리 사용량', value: 0 },
            disk: { label: '디스크 사용량', value: 0 },
            containerCount: { label: '실행 중인 컨테이너 수', value: 0, unit: '개' },
            network: { label: '네트워크 사용량', value: 0, unit: 'bps' },
            uptimeHours: { label: '서버 가동 시간', value: 0, unit: '시간' },
        },
        networkChart: [],
    });

    useEffect(() => {
        const getInfo = async () => {
            const res = await api.get('/dashboard/info');
            setData((prev) => ({
                ...prev,
                radial: {
                    ...prev.radial,
                    disk: {
                        label: '디스크 사용량',
                        value: Number(res.data.data.diskUsage) || 0,
                    },
                    uptimeHours: {
                        label: '서버 가동 시간',
                        value: Number(res.data.data.uptimeHours) || 0,
                        unit: '시간',
                    },
                },
            }));

            const ws = new WebSocket('ws://localhost:3738/ws/dashboard/info');

            ws.onmessage = (e) => {
                const msg = JSON.parse(e.data);
                if (msg.type !== 'dashboard-usage') return;

                const { cpuPercent, memoryPercent, networkUsage, runningContainer } = msg.data;
                const containerCount = runningContainer.length;

                setData((prev) => ({
                    ...prev,
                    radial: {
                        ...prev.radial,
                        cpu: { label: 'CPU 사용량', value: cpuPercent },
                        memory: { label: '메모리 사용량', value: memoryPercent },
                        network: { label: '네트워크 사용량', value: networkUsage, unit: 'bps' },
                        containerCount: {
                            label: '실행 중인 컨테이너 수',
                            value: containerCount,
                            unit: '개',
                        },
                    },
                }));
                // TODO: 컨테이너 테이블 추가
            };
        };
        getInfo();
    }, []);

    if (!data) return <div>로딩중</div>;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {/* CPU 리소스 */}
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <RadialChart data={data.radial.cpu} />
                </div>

                {/* 메모리 리소스 */}
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <RadialChart data={data.radial.memory} />
                </div>

                {/* 디스크 리소스 */}
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <RadialChart data={data.radial.disk} />
                </div>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {/* 실행중인 컨테이너 수 */}
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <RadialChart data={data.radial.containerCount} />
                </div>

                {/* 네트워크 사용량 */}
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <RadialChart data={data.radial.network} />
                </div>

                {/* 시스템 가동 시간 */}
                <div className="bg-muted/50 aspect-video rounded-xl">
                    <RadialChart data={data.radial.uptimeHours} />
                </div>
            </div>

            {/* 실행중인 컨테이너 목록 */}
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
                <ContainerTable containers={data.containerList} />
            </div>
        </div>
    );
}
