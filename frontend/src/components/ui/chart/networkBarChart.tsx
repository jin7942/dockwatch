'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export interface NetworkData {
    date: string;
    desktop: number;
    mobile: number;
}

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
    },
    mobile: {
        label: 'Mobile',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

export function NetworkBarChart({ data }: { data: NetworkData[] }) {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('desktop');

    const total = React.useMemo(
        () => ({
            desktop: data.reduce((acc, curr) => acc + curr.desktop, 0),
            mobile: data.reduce((acc, curr) => acc + curr.mobile, 0),
        }),
        [data]
    );

    return (
        <Card>
            <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
                <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
                    <CardTitle>네트워크 트래픽</CardTitle>
                    <CardDescription>최근 일주일 트래픽 변화</CardDescription>
                </div>
                <div className='flex'>
                    {['desktop', 'mobile'].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className='text-xs text-muted-foreground'>{chartConfig[chart].label}</span>
                                <span className='text-lg font-bold leading-none sm:text-3xl'>{total[chart].toLocaleString()}</span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className='px-2 sm:p-6'>
                <ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='date'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('ko-KR', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className='w-[150px]'
                                    nameKey='views'
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString('ko-KR', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })
                                    }
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
