'use client';

import * as React from 'react';
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios, { AxiosError } from 'axios';
import { PostReport } from '@/types/user';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';

export type Report = {
    id: string;
    userId: string;
    postId: string;
    post: React.ReactNode;
    author: React.ReactNode;
    reportCount: number;
    reason: string;
    actionTaken: string;
};

export default function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const [data, setData] = React.useState<Report[]>([]);

    const getReportedPosts = async () => {
        try {
            const { data } = await axios.get('/api/posts/reports');
            const reportData = data.map((item: PostReport) => ({
                id: item.id,
                postId: item.postId,
                userId: item.author.userId,
                post: (
                    <Link href={`/dashboard/posts/${item.postId}`}>
                        <Image src={item.imageUrls[0]} alt='Image' width={50} height={50} className='object-cover' />
                    </Link>
                ),
                author: (
                    <Link href={`/dashboard/users/${item.author.userId}`}>
                        <Image
                            src={item.author.imageUrl}
                            alt={item.author.username}
                            width={50}
                            height={50}
                            className='object-cover rounded-full'
                        />
                    </Link>
                ),
                reason: item.reason,
                username: item.author.username,
                actionTaken: item.actionTaken,
            }));
            setData(reportData);
        } catch (e) {
            const error = e as AxiosError;
            setData([]);
        }
    };

    React.useEffect(() => {
        getReportedPosts();
    }, []);

    const columns: ColumnDef<Report>[] = [
        {
            accessorKey: 'post',
            header: ({ column }) => {
                return (
                    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Post
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue('post')}</div>,
        },
        {
            accessorKey: 'author',
            header: ({ column }) => {
                return (
                    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Author
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                );
            },
            cell: ({ row }) => <div className='capitalize'>{row.getValue('author')}</div>,
        },
        {
            accessorKey: 'username',
            header: ({ column }) => {
                return (
                    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Username
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue('username')}</div>,
        },
        {
            accessorKey: 'reason',
            header: ({ column }) => {
                return (
                    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Reason
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue('reason')}</div>,
        },
        {
            accessorKey: 'actionTaken',
            header: ({ column }) => {
                return (
                    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Action Taken
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue('actionTaken')}</div>,
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const report = row.original;

                const handleWarning = async () => {
                    try {
                        const { data } = await axios.patch(`/api/posts/reports/${report.id}`, {
                            actionTaken: 'Warning Issued',
                            userId: report.userId,
                        });
                        toast({ title: `Warning Notification send`, description: `Reason: ${report.reason}` });
                        getReportedPosts();
                    } catch (error) {
                        console.log(error);
                    }
                };

                const handleRemovePost = async () => {
                    try {
                        const { data } = await axios.patch(`/api/posts/reports/${report.id}`, {
                            actionTaken: 'Post Removed',
                            userId: report.userId,
                        });
                        toast({ title: `User Blocked`, description: `Reason: ${report.reason}` });

                        getReportedPosts();
                    } catch (error) {
                        console.log(error);
                    }
                };

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'>Open menu</span>
                                <DotsHorizontalIcon className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={handleRemovePost}>Remove Post</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleWarning}>Send Warning</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className='w-full'>
            <div className='flex items-center py-4'>
                <Input
                    placeholder='Username...'
                    value={(table.getColumn('username')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('username')?.setFilterValue(event.target.value)}
                    className='max-w-sm'
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='ml-auto'>
                            Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className='capitalize'
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-end space-x-2 py-4'>
                <div className='flex-1 text-sm text-muted-foreground'>
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
                <div className='space-x-2'>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
