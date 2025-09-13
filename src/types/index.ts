import type { ComponentType } from "react";

export interface ISidebar {
    title: string,
    items: {
        title: string
        url: string
        Component: ComponentType
    }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "GUIDE"

export interface ITourType {
    _id: string,
    name: string
}
export interface IDivision {
    _id: string,
    name: string,
    description:string
}