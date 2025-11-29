import type React from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

const Sidebar = ({ children }: { children: React.ReactNode }) => (
    <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
            <Header />
            <main className="p-4">{children}</main>
        </SidebarInset>
    </SidebarProvider>
);

export default Sidebar;
