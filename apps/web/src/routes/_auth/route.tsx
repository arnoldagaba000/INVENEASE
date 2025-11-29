import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { authClient } from "@/lib/auth-client";

const searchParamSchema = z.object({
    redirect: z.string().optional(),
});

export const Route = createFileRoute("/_auth")({
    beforeLoad: async ({ search }) => {
        const session = await authClient.getSession();
        if (session.data) {
            throw redirect({
                to: search.redirect ?? "/dashboard",
                replace: true,
            });
        }
    },
    component: RouteComponent,
    validateSearch: zodValidator(searchParamSchema),
});

function RouteComponent() {
    return <Outlet />;
}
