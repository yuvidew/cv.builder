import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AlignRight } from 'lucide-react'
import { SideBar } from './SideBar'


export const MobileNav = () => {
    return (
        <Sheet>
        <SheetTrigger>
            <AlignRight />
        </SheetTrigger>
        <SheetContent side = 'left'>
            <SideBar/>
        </SheetContent>
        </Sheet>
    )
}
