// src/common/components/Table/TableComponent.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

export interface Column<T> {
    id: keyof T;
    label: string;
    align?: 'left' | 'right' | 'center';
    width?: number | string;
}

export interface TableComponentProps<T> {
    columns: Column<T>[];
    rows: T[];
    onRowClick?: (row: T) => void;
}

export const TableComponent = <T,>({ columns, rows, onRowClick }: TableComponentProps<T>) => {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell
                                key={String(col.id)}
                                align={col.align || 'left'}
                                sx={{ fontWeight: 'bold', width: col.width }}
                            >
                                {col.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow
                            key={idx}
                            hover
                            sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                            onClick={() => onRowClick?.(row)}
                        >
                            {columns.map((col) => (
                                <TableCell key={String(col.id)} align={col.align || 'left'}>
                                    {String(row[col.id as keyof T])}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
