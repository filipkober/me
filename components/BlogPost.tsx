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
    const classes = cn('container rounded-xl overflow-hidden border-2 border-white transition-all duration-300', className)
    const date = post.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  
    return (
        <div className={classes}>
            <div className='w-full relative'>
                <div className='relative w-full h-48 sm:h-52 overflow-hidden'>
                    <Image 
                        src={post.image || '/post_placeholder.jpg'} 
                        alt={post.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className='object-cover' 
                        priority 
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90' />
                </div>
                
                <div className='p-4'>
                    <h1 className='text-3xl font-bold mb-2'>
                        {nolink ? post.title : (
                            <Link 
                                href={`/blog/posts/${post.id}`} 
                                className="hover:gradient-text transition-colors"
                            >
                                {post.title}
                            </Link>
                        )}
                    </h1>
                    
                    {post.tags.length > 0 && (
                        <ScrollArea className='w-full whitespace-nowrap mb-2'>
                            <div className='flex w-max gap-2 pb-2'>
                                {post.tags.map(tag => (
                                    <TagLabel key={tag.id} name={tag.name} description={tag.description} style={tag.style} />
                                ))}
                            </div>
                            <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                    )}
                    
                    <p className='text-sm text-gray-400 mb-2'>{date}</p>
                    <p className='text-gray-300'>{post.description}</p>
                </div>
            </div>
        </div>
    )
}
