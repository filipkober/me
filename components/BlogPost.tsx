"use client"
import React from 'react'
import Image from 'next/image'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import TagLabel from './TagLabel'
import { cn } from '@/lib/utils'
import { SmallPostType } from '@/types/Post'
import Link from 'next/link'

interface BlogPostProps {
    post: SmallPostType
    className?: string
    nolink?: boolean
}

export default function BlogPost({ post, className, nolink = false }: BlogPostProps) {
    const classes = cn('container border-2 border-white rounded-xl overflow-clip', className)
    const date = post.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <div className={classes}>
        <div className='max-h-[20vh] lg:max-h-[40vh] w-full overflow-clip relative'>
        <Image src={post.image || '/post_placeholder.jpg'} alt='blog post' width={800} height={500} objectFit='cover' className='w-full rounded-xl' />
        <div className='h-[105%] w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.5)0%,rgba(0,0,0,1)100%)] -bottom-2 left-0 z-10 absolute rounded-xl' />
        <h1 className='text-5xl font-bold z-20 mx-4 absolute bottom-0 left-0'>{nolink ? post.title : <Link href={`/blog/posts/${post.id}`}>{post.title}</Link>}</h1>
        </div>
        <div className='px-4 mt-2 pb-4'>
        {post.tags.length > 0 && (<ScrollArea className='w-full whitespace-nowrap'>
            <div className='flex w-max gap-2 pb-2'>
                {post.tags.map(tag => (
                    <TagLabel key={tag.id} name={tag.name} description={tag.description} style={tag.style} />
                ))}
            </div>
            <ScrollBar orientation='horizontal' />
        </ScrollArea>)}
        <p className='text-lg text-gray-300'>{date}</p>
        <p className='text-lg'>{post.description}</p>
        </div>
    </div>
  )
}
