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

export interface Column {
    id: string;
    label: string;
    align?: 'left' | 'right' | 'center';
    width?: number | string;
}

export interface TableComponentProps {
    columns: Column[];
    rows: Record<string, string>[];
    onRowClick?: (id: string) => void;
}

export const TableComponent = ({ columns, rows, onRowClick }: TableComponentProps) => {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell
                                key={col.id}
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
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                const id = row['id'] as string;
                                if (onRowClick && id) onRowClick(id);
                            }}
                        >
                            {columns.map((col) => (
                                <TableCell key={col.id} align={col.align || 'left'}>
                                    {row[col.id] as React.ReactNode}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
