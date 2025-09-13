import { role } from "@/constants/role";
import { adminSidebarItems } from "@/Routes/adminSidebarItems";
import { userSidebarItems } from "@/Routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems=(userRole:TRole)=>{
switch (userRole) {
    case role.superAdmin:
        return [...adminSidebarItems];
    case role.admin:
        
        return [...adminSidebarItems];
    case role.user:
        
        return [...userSidebarItems];
    default:
        return [];
}
}