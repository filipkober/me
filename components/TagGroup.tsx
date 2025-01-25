"use client";

import { TagType } from '@/types/Tag';
import React from 'react'
import Tag from './Tag';
import { cn } from '@/lib/utils';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface TagGroupProps {
    tags: TagType[];
    selectedTags?: TagType[];
    setSelectedTags?: (tags: TagType[]) => void;
    className?: string;
}

export default function TagGroup({ tags, selectedTags, setSelectedTags, className }: TagGroupProps) {

    const cname = cn('flex flex-row gap-4 flex-wrap', className);

    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

    const sTags = (selectedTags || currentParams.get('tags')?.split(',').map(tag => {
        return tags.find(t => t.id === tag);
    }) || []).filter((tag): tag is TagType => tag !== undefined);

  return (
    <div className={cname}>{tags.map(tag => {
        const toggled = sTags.find(t => t.id === tag.id) ? true : false;
        return <Tag key={tag.name} name={tag.name} toggled={toggled} onClick={() => {
            if (toggled) {
                const newSelectedTags = sTags.filter(t => t.id !== tag.id);
                if(setSelectedTags) {
                    setSelectedTags(newSelectedTags);
                } else {
                    currentParams.delete('tags');
                    currentParams.append('tags', newSelectedTags.map(t => t.id).join(','));
                }
            } else {
                if(setSelectedTags) {
                    setSelectedTags([...sTags, tag]);
                } else {
                    currentParams.delete('tags');
                    currentParams.append('tags', [...sTags, tag].map(t => t.id).join(','));
                }
            }
            if(!setSelectedTags) {
                router.push(`${pathname}?${currentParams.toString()}`);
            }
        }} 
        style={toggled ? tag.styleToggled : tag.style}
        description={tag.description}
        />
    })}</div>
  )
}
