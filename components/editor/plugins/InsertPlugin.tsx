import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Plus } from 'lucide-react'
import ImagePlugin from './ImagePlugin'


export default function InsertPlugin() {


  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='flex gap-2 border-[1px] px-2'><span className='my-auto'>Insert</span> <Plus className='my-auto' /></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Component Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ImagePlugin />
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
