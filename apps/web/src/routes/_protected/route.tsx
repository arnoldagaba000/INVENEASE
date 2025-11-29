import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "@/components/nav/Header";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_protected")({
    beforeLoad: async ({location}) => {
        const session = await authClient.getSession();
        if (!session.data) {
            throw redirect({
                to: "/login",
                search: { redirect: location.href }
            });
        }
        return session;
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
