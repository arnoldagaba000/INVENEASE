import { Link } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "../ui/sidebar";
import NavMain from "./NavMain";
import NavUser from "./NavUser";

const AppSidebar = () => {
    const session = authClient.useSession();
    const user = session.data?.user;

    if (!user) {
        return null;
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link to="/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>

                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">
                                        INVENEASE
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                        v1.0.0
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};

export default AppSidebar;
