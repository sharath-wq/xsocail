'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PopularPosts = ({ data }: { data: any[] }) => {
    return (
        <div className='bg-secondary p-5 rounded-xl'>
            <h2 className='mb-5 font-extralight'>Popular Posts.</h2>
            <table className='w-full'>
                <thead>
                    <tr>
                        <td className='p-3'>Post</td>
                        <td className='p-3'>User</td>
                        <td className='p-3'>Username</td>
                        <td className='p-3'>Likes</td>
                        <td className='p-3'>Comments</td>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((post) => (
                            <tr>
                                <td className='p-3'>
                                    <Link href={`/dashboard/posts/${post.id}`} className='flex gap-3 items-center'>
                                        <Image
                                            src={post.imageUrls[0]}
                                            alt='post'
                                            width={60}
                                            height={60}
                                            className='object-cover'
                                        />
                                    </Link>
                                </td>
                                <td className='p-3'>
                                    <Link
                                        href={`/dashboard/users/${post.author.userId}`}
                                        className='flex gap-3 items-center'
                                    >
                                        <Image
                                            src={post.author.imageUrl}
                                            alt='post'
                                            width={40}
                                            height={40}
                                            className='object-cover rounded-full'
                                        />
                                    </Link>
                                </td>
                                <td className='p-3'>{post.author.username}</td>
                                <td className='p-3'>{post.likes.length}</td>
                                <td className='p-3'>{post.comments.length}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default PopularPosts;
