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

    const cname = cn('bg-[hsl(var(--background))] p-2 rounded-xl', className)

  return (
    <Breadcrumb className={cname}>
        <BreadcrumbList>
            {pathArray.map((pathFragment, index) => {
                const path = pathArray.slice(1, index + 1).join('/')
                return (
                    <Fragment key={path}>
                        <BreadcrumbItem>
                            {index < pathArray.length - 1 ? (<BreadcrumbLink href={`/${path}`}>{pathFragment}</BreadcrumbLink>) : <span className='font-bold'>{pathFragment}</span>}
                        </BreadcrumbItem>
                        {index < pathArray.length - 1 && <BreadcrumbSeparator/>}
                    </Fragment>
                )
            })}
        </BreadcrumbList>
    </Breadcrumb>
  )
}
