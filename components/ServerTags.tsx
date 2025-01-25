import React from 'react'
import TagGroup from './TagGroup'
import { getTags } from '@/app/admin/blog/tag/new/actions'

export default async function ServerTags() {

    const tags = await getTags();

  return (
    <TagGroup tags={tags} className="mx-auto lg:w-1/2 mt-4" />
  )
}
