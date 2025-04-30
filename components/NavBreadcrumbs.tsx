"use client";
import { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';

export default function NavBreadcrumbs({className} : {className?: string}) {

    const pathname = usePathname()
    const pathArray = ["home", ...pathname.split('/').filter(Boolean)]

    if (pathArray.length === 1) {
        return null
    }

    const cname = cn('bg-[hsl(var(--background))] p-2 rounded-xl breadcrumbs', className)

  return (
    <Breadcrumb className={cname}>
        <BreadcrumbList className='max-w-[80vw] flex-nowrap'>
            {pathArray.map((pathFragment, index) => {
                const path = pathArray.slice(1, index + 1).join('/')
                const isLast = index === pathArray.length - 1
                return (
                    <Fragment key={path}>
                        <BreadcrumbItem className={isLast ? 'truncate' : ''}>
                            {!isLast ? (<BreadcrumbLink href={`/${path}`}>{pathFragment}</BreadcrumbLink>) : <span className='font-bold truncate'>{pathFragment}</span>}
                        </BreadcrumbItem>
                        {index < pathArray.length - 1 && <BreadcrumbSeparator/>}
                    </Fragment>
                )
            })}
        </BreadcrumbList>
    </Breadcrumb>
  )
}
