import { Link, useLocation } from "@tanstack/react-router";
import { Home, type LucideIcon, Settings, User } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

type Nav = {
    title: string;
    to: string;
    icon: LucideIcon;
};

const navigation: Nav[] = [
    { title: "Dashboard", to: "/dashboard", icon: Home },
    { title: "Profile", to: "/profile", icon: User },
    { title: "Settings", to: "/settings", icon: Settings },
];

const NavMain = () => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {navigation.map((nav) => {
                        const isActive = nav.to === pathname;

                        return (
                            <SidebarMenuItem key={nav.title}>
                                <SidebarMenuButton asChild isActive={isActive}>
                                    <Link
                                        className="items-center-safe flex gap-2 py-1.5"
                                        to={nav.to}
                                    >
                                        <nav.icon /> <span>{nav.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default NavMain;
