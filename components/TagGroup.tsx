"use client";

import { TagType } from '@/types/Tag';
import React from 'react'
import Tag from './Tag';

interface TagGroupProps {
    tags: TagType[];
    selectedTags: TagType[];
    setSelectedTags: (tags: TagType[]) => void;
}

export default function TagGroup({ tags, selectedTags, setSelectedTags }: TagGroupProps) {
  return (
    <div className='flex flex-row gap-4 flex-wrap'>{tags.map(tag => {
        const toggled = selectedTags.find(t => t.id === tag.id) ? true : false;
        return <Tag key={tag.name} name={tag.name} toggled={toggled} onClick={() => {
            if (toggled) {
                const newSelectedTags = selectedTags.filter(t => t.id !== tag.id);
                setSelectedTags(newSelectedTags);
            } else {
                setSelectedTags([...selectedTags, tag]);
            }
        }} 
        style={toggled ? tag.styleToggled : tag.style}
        description={tag.description}
        />
    })}</div>
  )
}
