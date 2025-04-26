'use client';

import { AreaChart, Area, YAxis, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { ResourceFullData, NetworkResourceData, ChartData } from '@/_types/api';

interface ResourceChartProps {
    data: ResourceFullData | NetworkResourceData;
}

export function ResourceChart({ data }: ResourceChartProps) {
    const chartData = data.chart;
    const isNetwork = 'tx' in (data.chart?.[0] || {});
    const yDomain = isNetwork ? 1000 : 100;

    const displayedData = chartData.map((item, i) => ({
        ...item,
        x: i + 1, // 항상 1 ~ 60
    }));

    return (
        <Card className='w-full h-full'>
            <CardHeader className='flex justify-between items-start'>
                <CardTitle>사용률</CardTitle>
                {!isNetwork && <div className='text-2xl font-bold text-primary'>{Math.round((data.chart as ChartData[]).at(-1)?.value ?? 0)}%</div>}
            </CardHeader>

            <CardContent style={{ height: 200 }}>
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={displayedData}>
                        <XAxis
                            dataKey='x'
                            type='number'
                            domain={[1, 60]}
                            reversed={false}
                            ticks={[1, 60]}
                            tickFormatter={(v) => (v === 1 || v === 60 ? `${v}` : '')}
                            axisLine={true}
                            tickLine={true}
                            tickMargin={8}
                        />
                        <YAxis
                            type='number'
                            domain={[0, yDomain]}
                            tickFormatter={(v) => `${v}`} // 네트워크는 %가 아님
                            axisLine={true}
                            tickLine={true}
                            tickMargin={8}
                        />
                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                color: '#f8fafc',
                                border: 'none',
                                borderRadius: '0.375rem',
                                fontSize: '0.75rem',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                padding: '0.5rem 0.75rem',
                            }}
                            formatter={(value) => [`${value}`, isNetwork ? 'KB/s' : '사용률']}
                        />
                        {isNetwork ? (
                            <>
                                <Area dataKey='tx' type='linear' stroke='#3b82f6' strokeWidth={2} fill='#3b82f6' fillOpacity={0.15} isAnimationActive={false} />
                                <Area dataKey='rx' type='linear' stroke='#10b981' strokeWidth={2} fill='#10b981' fillOpacity={0.15} isAnimationActive={false} />
                            </>
                        ) : (
                            <Area dataKey='value' type='linear' stroke='#3b82f6' strokeWidth={2} fill='#3b82f6' fillOpacity={0.15} isAnimationActive={false} />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>

            {data.info.length > 0 && (
                <CardContent className='grid grid-cols-2 md:grid-cols-3 gap-2 text-xm text-muted-foreground'>
                    {data.info.map((item, index) => (
                        <div key={index}>
                            <span className='font-bold'>{item.label}</span>: {item.value}
                        </div>
                    ))}
                </CardContent>
            )}
        </Card>
    );
}
