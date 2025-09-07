import type { ISidebar } from "@/types"



export const generateRoutes=(sidebarItems:ISidebar[])=>{
    return sidebarItems.flatMap((section)=>section.items.map((route)=>({
        path:route.url,
        Component:route.Component
    })))
}