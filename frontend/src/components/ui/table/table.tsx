'use client';

import { Table as ShadcnTable, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

export interface TableColumn {
    key: string;
    label: string;
}

export interface TableData {
    columns: TableColumn[];
    rows: Record<string, React.ReactNode>[];
}

interface TableProps {
    data: TableData;
}

export function Table({ data }: TableProps) {
    return (
        <Card className='h-full border rounded-md'>
            <ScrollArea className='h-full'>
                <ShadcnTable>
                    <TableHeader>
                        <TableRow>
                            {data.columns.map((col) => (
                                <TableHead key={col.key} className='text-xs text-muted-foreground'>
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {data.columns.map((col) => (
                                    <TableCell key={col.key} className='text-xs'>
                                        {row[col.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </ShadcnTable>
            </ScrollArea>
        </Card>
    );
}
