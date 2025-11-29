import { useNavigate } from "@tanstack/react-router";
import { BadgeCheck, ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { authClient, type User } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "../ui/sidebar";

const NavUser = ({ user }: { user: User }) => {
    const { isMobile } = useSidebar();
    const navigate = useNavigate();

    const logOutUser = () => {
        authClient.signOut();
        navigate({ to: "/login", replace: true });
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            size="lg"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    alt={user.name}
                                    src={user.image ?? undefined}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {user.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {user.name}
                                </span>
                                <span className="truncate text-xs">
                                    {user.email}
                                </span>
                            </div>

                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        alt={user.name}
                                        src={user.image ?? undefined}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {user.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {user.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => navigate({ to: "/profile" })}
                            >
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => navigate({ to: "/settings" })}
                            >
                                <Settings />
                                Settings
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={() => logOutUser()}>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default NavUser;
