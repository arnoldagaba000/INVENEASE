import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Sidebar from "@/components/nav/sidebar";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_protected")({
    beforeLoad: async ({ location }) => {
        const session = await authClient.getSession();
        if (!session.data) {
            throw redirect({
                to: "/login",
                search: { redirect: location.href },
            });
        }
        return session;
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Sidebar>
            <Outlet />
        </Sidebar>
    );
}
