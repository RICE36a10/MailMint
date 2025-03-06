import React from 'react'
import {Header} from "@/components/custom/Header";

export default function DashboardLayout({children}) {
    return (
        <div>
            <Header/>
            {children}
        </div>
    )
}
