import AddTour from "@/pages/Admin/AddTour";
import Analytics from "@/pages/Admin/Analytics";
import type { ISidebar } from "@/types";

export const adminSidebarItems: ISidebar[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                Component: Analytics
            },
        ],
    },
    {
        title: "Tour Management",
        items: [
            {
                title: "Add Tour",
                url: "/admin/add-tour",
                Component: AddTour
            },
            {
                title: "All Tour",
                url: "/admin/all-tour",
                Component: AddTour
            },
        ],
    },
] 