'use client';

import { TrendingUp } from 'lucide-react';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

// 원형 차트에 보여줄 데이터 타입
export interface RadialChartData {
    label: string;
    value: number;
    unit?: string;
    description?: string;
    trend?: number;
}

export function RadialChart({ data }: { data: RadialChartData }) {
    const unit = data.unit ?? '%';

    const ratio = unit === '%' ? data.value * 3.6 : 360;

    const chartData = [
        {
            name: data.label,
            visitors: data.value,
            fill: 'hsl(var(--chart-2))',
        },
    ];

    const chartConfig = {
        visitors: {
            label: data.label,
        },
        [data.label]: {
            label: data.label,
            color: 'hsl(var(--chart-2))',
        },
    } satisfies ChartConfig;

    return (
        <Card className='flex flex-col'>
            <CardHeader className='items-center pb-0'>
                <CardTitle>{data.label}</CardTitle>
                {data.description && <CardDescription>{data.description}</CardDescription>}
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
                <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
                    <RadialBarChart data={chartData} startAngle={0} endAngle={ratio} innerRadius={80} outerRadius={110}>
                        <PolarGrid
                            gridType='circle'
                            radialLines={false}
                            stroke='none'
                            className='first:fill-muted last:fill-background'
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey='visitors' background cornerRadius={10} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                                                <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-4xl font-bold'>
                                                    {data.value.toLocaleString()}
                                                    {unit && <tspan className='text-2xl'> {unit}</tspan>}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                                                    {data.label}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            {typeof data.trend === 'number' && (
                <CardFooter className='flex-col gap-2 text-sm'>
                    <div className='flex items-center gap-2 font-medium leading-none'>
                        지난달 대비 {data.trend > 0 ? '+' : ''}
                        {data.trend}% <TrendingUp className='h-4 w-4' />
                    </div>
                    <div className='leading-none text-muted-foreground'>최근 6개월 기준</div>
                </CardFooter>
            )}
        </Card>
    );
}
