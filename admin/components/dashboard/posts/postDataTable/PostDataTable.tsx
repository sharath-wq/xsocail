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
import { Checkbox } from '@/components/ui/checkbox';
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
import Link from 'next/link';
import { useEffect } from 'react';
import { Post, PostModel } from '@/types/post';
import Image from 'next/image';

const adjustPosts = (postData: PostModel[]): Post[] => {
    const adjustedPosts = postData.map((post) => ({
        ...post,
        username: post.author.username,
        likes: post.likes.length,
        comments: post.comments.length,
        reportedBy: post.reportedBy.length,
        isDeleted: post.isDeleted,
    }));

    return adjustedPosts;
};

export default function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const [posts, setPosts] = React.useState<Post[]>();

    const handleVisibility = async (id: string, isDeleted: boolean) => {
        try {
            const { data } = await axios.patch(`/api/posts/${id}`, {
                isDeleted: !isDeleted,
            });

            setPosts((prevPosts: any) => {
                return prevPosts.map((post: any) => {
                    if (post.id === id) {
                        return { ...post, isDeleted: !isDeleted };
                    }
                    return post;
                });
            });
        } catch (e) {
            const error = e as AxiosError;
            console.log(error);
        }
    };

    const columns: ColumnDef<Post>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label='Select all'
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label='Select row'
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const isHidden = row.original.isDeleted;
                return (
                    <div className={`capitalize cursor-pointer ${isHidden ? 'text-red-500' : 'text-green-500'}`}>
                        {isHidden ? 'Hidden' : 'Active'}
                    </div>
                );
            },
        },
        {
            accessorKey: 'post',
            header: 'Post',
            cell: ({ row }) => {
                const imageUrls = row.original.imageUrls;
                return <Image src={imageUrls[0]} alt='Image' width={50} height={50} className='object-cover' />;
            },
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
            cell: ({ row }) => <div className='capitalize'>{row.getValue('username')}</div>,
        },
        {
            accessorKey: 'likes',
            header: ({ column }) => {
                return (
                    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Likes
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                );
            },
            cell: ({ row }) => <div className='capitalize'>{row.getValue('likes')}</div>,
        },
        {
            accessorKey: 'comments',
            header: ({ column }) => {
                return (
                    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Comments
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue('comments')}</div>,
        },
        {
            accessorKey: 'reportedBy',
            header: ({ column }) => {
                return (
                    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Report Count
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.getValue('reportedBy')}</div>,
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const post = row.original;

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
                            {/* <DropdownMenuItem onClick={() => console.log('Block user:', user.username)}>Block</DropdownMenuItem> */}
                            {/* <DropdownMenuItem onClick={() => console.log('Deactivate user:', user.username)}>
                            Deactivate
                        </DropdownMenuItem> */}
                            <DropdownMenuItem>
                                <Link href={`/dashboard/posts/${post.id}`}>View</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span onClick={() => handleVisibility(post.id, post.isDeleted)}>
                                    {post.isDeleted ? 'Make Visible' : 'Hide'}
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const getUsers = async () => {
        try {
            const { data } = await axios.get('/api/posts');
            const adjustedPosts = adjustPosts(data);

            setPosts(adjustedPosts);
        } catch (e) {
            const error = e as AxiosError;
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const table = useReactTable({
        data: posts || [],
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
                    placeholder='Filter username...'
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
